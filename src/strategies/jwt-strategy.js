import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";

import { getUserById } from "../services/UsersService";

const jwtConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    ignoreExpiration: false,
};

passport.use(
    new Strategy(jwtConfig, async (payload, done) => {
        try {
            const user = await getUserById(payload.id);

            if(user) {
                return done(null, user);
            }
        } catch (error) {
            return done(error);
        }

    }),
);