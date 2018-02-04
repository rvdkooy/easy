import * as passport from 'passport';
import * as express from 'express';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import * as config from 'config';
import UserModel, { IUserModel, findByEmail } from '../db/userModel';
import { LoggerInstance } from 'winston';
import { GOOGLE_AUTH, ACCOUNT } from '../config';

const serializeUser = (userModel: IUserModel) => {
    return {    
        displayName: userModel.displayName,
        tenantId: userModel.tenantId,
        sites: userModel.sites,
        email: userModel.email,
        photo: userModel.photo       
    };
}

export const configurePassport = (app: express.Express, logger: LoggerInstance) => {
    const GOOGLE_AUTH = config.get('GOOGLE_AUTH') as GOOGLE_AUTH;
    const ACCOUNTS = config.get('ACCOUNTS') as ACCOUNT[];
    
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
        clientID: GOOGLE_AUTH.CLIENT_ID,
        clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
        callbackURL: GOOGLE_AUTH.CALLBACK_URL
      }, 
      (accessToken: string, refreshToken: string, profile: any, cb: any) => {
        findByEmail(profile.emails[0].value).then(user => {
            
            const adminAccount = ACCOUNTS.find(a => a.email === profile.emails[0].value) as any;
    
            if (!adminAccount) {
                logger.error("The user that wants to login is unknown");
                cb(null, false);
                return;
            }

            if (!user) {
                var newUser = new UserModel({
                    tenantId: adminAccount.tenantId,
                    sites: adminAccount.sites,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    gender: profile.gender,
                    photo: (profile.photos.length) ? profile.photos[0].value : null ,
                    provider: {
                        name: 'google',
                        id: profile.id
                    }
                });
                
                newUser.save()
                    .then(()=> { 
                        logger.info(`User '${profile.displayNam}' created`);
                        cb(null, serializeUser(newUser));
                    })
                    .catch(err => {
                        logger.error(`Error occured while creating user '${profile.displayNam}'`); 
                        cb(err)
                    });
            } else {
                cb(null, serializeUser(user));
            }
        })
        .catch(err => cb(err));
      }
    ));
    app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile', 'openid'] }));
    
    app.get('/auth/google/callback', 
        passport.authenticate('google', { successRedirect: '/admin', failureRedirect: 'admin/login' }));


    passport.serializeUser((user, cb) => cb(null, user));
    
    passport.deserializeUser((obj, cb) => cb(null, obj));

    return passport;
};
