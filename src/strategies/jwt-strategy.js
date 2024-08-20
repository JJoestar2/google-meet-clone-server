import { ExtractJwt, Strategy } from "passport-jwt";

import UsersService from "../services/UsersService.js";

const jwtConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // process.env.JWT_SECRET,
    secretOrKey: 'XLV89iuI6G7Jo5ucsf3RUpr00MpDXfNL',
    ignoreExpiration: false,
};

console.log(process.env.JWT_SECRET);

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
