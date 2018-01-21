import * as passport from 'passport';
import * as express from 'express';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import * as config from 'config';
import UserModel, { IUserModel, findByEmail } from '../db/userModel';
import { LoggerInstance } from 'winston';

const GOOGLE_AUTH = config.get('GOOGLE_AUTH') as any;
const ADMIN_ACCOUNTS = config.get('ADMIN_ACCOUNTS') as string[];

const serializeUser = (userModel: IUserModel) => {
    return {    
        displayName: userModel.displayName,
        email: userModel.email,
        photo: userModel.photo       
    };
}

export const configurePassport = (app: express.Express, logger: LoggerInstance) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
        clientID: GOOGLE_AUTH.CLIENT_ID,
        clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
        callbackURL: GOOGLE_AUTH.CALLBACK_URL
      }, 
      (accessToken: string, refreshToken: string, profile: any, cb: any) => {
        findByEmail(profile.emails[0].value).then(user => {
            
            if (ADMIN_ACCOUNTS.indexOf(profile.emails[0].value) === -1) {
                logger.error("The user that wants to login is not an admin account");
                cb(null, false);
                return;
            }

            if (!user) {
                var newUser = new UserModel({
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
