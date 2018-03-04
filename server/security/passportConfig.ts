import * as passport from 'passport';
import * as express from 'express';
import * as mongoose from 'mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import * as config from 'config';
import UserModel, { IUserModel, findByEmail } from '../db/userModel';
import { ITenantModel, findTenantByEmail } from '../db/tenantModel';
import { LoggerInstance } from 'winston';
import { GOOGLE_AUTH } from '../config';

const serializeUser = (userModel: IUserModel) => {
    return {    
        displayName: userModel.displayName,
        tenantId: userModel.tenantId,
        sites: userModel.sites,
        email: userModel.email,
        photo: userModel.photo       
    };
}

export const configurePassport = (app: express.Express, tenantModelInstance: mongoose.Model<ITenantModel>, logger: LoggerInstance) => {
    const GOOGLE_AUTH = config.get('GOOGLE_AUTH') as GOOGLE_AUTH;
    
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
        clientID: GOOGLE_AUTH.CLIENT_ID,
        clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
        callbackURL: GOOGLE_AUTH.CALLBACK_URL
      }, 
      async (accessToken: string, refreshToken: string, profile: any, cb: any) => {

            try {
                const existingUser = await findByEmail(profile.emails[0].value);
                const existingTenant = await findTenantByEmail(profile.emails[0].value);
                
                if (!existingTenant) {
                    logger.error("The user that wants to login is unknown");
                    cb(null, false);
                    return;
                }

                if (!existingUser) {
                    var newUser = new UserModel({
                        tenantId: existingTenant.tenantId,
                        sites: existingTenant.sites,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        gender: profile.gender,
                        photo: (profile.photos.length) ? profile.photos[0].value : null ,
                        provider: {
                            name: 'google',
                            id: profile.id
                        }
                    });
                    
                    await newUser.save();    
                    logger.info(`User '${profile.displayNam}' created`);
                    cb(null, serializeUser(newUser));
                        
                } else {
                    cb(null, serializeUser(existingUser));
                }
            } catch (err) {
                logger.error(err);
                logger.error(`Error occured while logging in the current user '${profile.displayNam}'`);
                cb(err)
            }
        }
    ));
    app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile', 'openid'] }));
    
    app.get('/auth/google/callback', 
        passport.authenticate('google', { successRedirect: '/admin', failureRedirect: 'admin/login' }));

    passport.serializeUser((user, cb) => cb(null, user));
    
    passport.deserializeUser((obj, cb) => cb(null, obj));

    return passport;
};
