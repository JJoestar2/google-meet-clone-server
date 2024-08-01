import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UsersService from "./UsersService.js";

class AuthService {
    saltOrRounds = 10;

    static loginUser = async ({ email, password }) => {
        const user = await UsersService.getUserByEmail(email);
    
        if (!user) return null;
    
        const isPasswordMatched = await bcrypt.compare(password, user?.password);
    
        if(!isPasswordMatched) return null;
    
        const userPayload = {
            sub: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar || "",
        };
    
        const accessToken = jwt.sign(
            userPayload,
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
    
        return { user: userPayload, accessToken };
    }
    
    static registerUser = async ({ name, email, password, avatar }) => {
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const newUser = await UsersService.createUser({ name, email, hashedPassword, avatar: avatar || "" });
    
        const userPayload = {
            sub: newUser._id,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar || "",
        };
    
        return userPayload;
    }
}

export default AuthService;
