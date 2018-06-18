import * as config from 'config';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { LoggerInstance } from 'winston';
import { GOOGLE_AUTH } from '../config';
import { findAllTenants, findTenantsByEmail, ITenantModel } from '../db/tenantModel';
import UserModel, { findByEmail, IUserModel } from '../db/userModel';

interface TenantDto {
    tenantId: string;
    site: string;
}

const serializeUser = (userModel: IUserModel, associatedTenants: TenantDto[]) => {
    return {
        displayName: userModel.displayName,
        tenants: associatedTenants,
        email: userModel.email,
        photo: userModel.photo,
        rootAccount: userModel.rootAccount,
    };
};

const getAssociatedTenants = async (email: string, ROOT_ACCOUNT: string): Promise<TenantDto[]> => {
    let tenants = [];
    if (email === ROOT_ACCOUNT) {
        tenants = await findAllTenants();
    } else {
        tenants = await findTenantsByEmail(email);
    }
    return tenants.map((t) => {
        return {
            tenantId: t.tenantId,
            site: (t.sites.length) ? t.sites[0] : 'N/A',
        };
    });
};

export const configurePassport = (app: express.Express,
                                  tenantModelInstance: mongoose.Model<ITenantModel>,
                                  logger: LoggerInstance) => {

    const GOOGLEAUTH = config.get('GOOGLE_AUTH') as GOOGLE_AUTH;
    const ROOT_ACCOUNT = config.get('ROOT_ACCOUNT') as string;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
        clientID: GOOGLEAUTH.CLIENT_ID,
        clientSecret: GOOGLEAUTH.CLIENT_SECRET,
        callbackURL: GOOGLEAUTH.CALLBACK_URL,
    }, async (accessToken: string, refreshToken: string, profile: any, cb: any) => {

        try {
            const email = profile.emails[0].value;
            const associatedTenants = await getAssociatedTenants(email, ROOT_ACCOUNT);

            if (!associatedTenants) {
                logger.error('The user that wants to login is not associated with any tenant');
                cb(null, false);
            } else {
                const existingUser = await findByEmail(email);

                if (!existingUser) {
                    const newUser = new UserModel({
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        gender: profile.gender,
                        photo: (profile.photos.length) ? profile.photos[0].value : null,
                        provider: {
                            name: 'google',
                            id: profile.id,
                        },
                        rootAccount: (email === ROOT_ACCOUNT),
                    });

                    await newUser.save();
                    logger.info(`User '${profile.displayName}' created`);
                    cb(null, serializeUser(newUser, associatedTenants));

                } else {
                    cb(null, serializeUser(existingUser, associatedTenants));
                }
            }
        } catch (err) {
            logger.error(err);
            logger.error(`Error occured while logging in the current user '${profile.displayName}'`);
            cb(err);
        }
    }));

    app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile', 'openid'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { successRedirect: '/admin', failureRedirect: 'admin/login' }));

    passport.serializeUser((user, cb) => cb(null, user));

    passport.deserializeUser((obj, cb) => cb(null, obj));

    return passport;
};
