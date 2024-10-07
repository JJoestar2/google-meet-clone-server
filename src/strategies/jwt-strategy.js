import { ExtractJwt, Strategy } from "passport-jwt";

import UsersService from "../services/UsersService.js";

const jwtConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.JWT_SECRET,
    ignoreExpiration: false,
};

const verifyJWT = async (payload, done) => {
    try {
        const user = await UsersService.getUserById(payload.id);

        if (!user) return done(null, false);

        return done(null, user);
        
    } catch (error) {
        return done(error);
    }
};

export const strategy = new Strategy(jwtConfig, verifyJWT);
