import * as passport from 'passport';
import * as express from 'express';
import * as mongoose from 'mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import * as config from 'config';
import UserModel, { IUserModel, findByEmail } from '../db/userModel';
import { ITenantModel, findTenantsByEmail, findAllTenants } from '../db/tenantModel';
import { LoggerInstance } from 'winston';
import { GOOGLE_AUTH } from '../config';
import { get } from 'http';

const serializeUser = (userModel: IUserModel, associatedTenants: ITenantModel[]) => {
    return {
        displayName: userModel.displayName,
        tenants: associatedTenants.map(t => ({ tenantId: t.tenantId, sites: t.sites })),
        email: userModel.email,
        photo: userModel.photo
    };
}

const getAssociatedTenants = async (email: string, ROOT_ACCOUNT: string) => {
    if (email === ROOT_ACCOUNT) {
        return await findAllTenants()
    } else {
        return await findTenantsByEmail(email);
    }
};

export const configurePassport = (app: express.Express, tenantModelInstance: mongoose.Model<ITenantModel>, logger: LoggerInstance) => {
    const GOOGLE_AUTH = config.get('GOOGLE_AUTH') as GOOGLE_AUTH;
    const ROOT_ACCOUNT = config.get('ROOT_ACCOUNT') as string;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
        clientID: GOOGLE_AUTH.CLIENT_ID,
        clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
        callbackURL: GOOGLE_AUTH.CALLBACK_URL
    }, async (accessToken: string, refreshToken: string, profile: any, cb: any) => {

        try {
            const email = profile.emails[0].value;
            const associatedTenants = await getAssociatedTenants(email, ROOT_ACCOUNT);

            if (!associatedTenants) {
                logger.error("The user that wants to login is not associated with any tenant");
                cb(null, false);
            } else {
                const existingUser = await findByEmail(email);

                if (!existingUser) {
                    var newUser = new UserModel({
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        gender: profile.gender,
                        photo: (profile.photos.length) ? profile.photos[0].value : null,
                        provider: {
                            name: 'google',
                            id: profile.id
                        }
                    });

                    await newUser.save();
                    logger.info(`User '${profile.displayNam}' created`);
                    cb(null, serializeUser(newUser, associatedTenants));

                } else {
                    cb(null, serializeUser(existingUser, associatedTenants));
                }
            }
        } catch (err) {
            logger.error(err);
            logger.error(`Error occured while logging in the current user '${profile.displayNam}'`);
            cb(err)
        }
    }));

    app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile', 'openid'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { successRedirect: '/admin', failureRedirect: 'admin/login' }));

    passport.serializeUser((user, cb) => cb(null, user));

    passport.deserializeUser((obj, cb) => cb(null, obj));

    return passport;
};
