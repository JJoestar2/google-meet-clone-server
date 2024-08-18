import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UsersService from "./UsersService.js";
import RefreshTokenService from "./RefreshTokenService.js";

class AuthService {
    saltOrRounds = 10;

    static loginUser = async ({ email, password }) => {
        const user = await UsersService.getUserByEmail(email);
    
        if (!user) return { success: false, status: 404, message: 'User not found' };
    
        const isPasswordMatched = await bcrypt.compare(password, user?.password);
    
        if(!isPasswordMatched) return { success: false, status: 401, message: 'Invalid password or email.' };

        const tokens = await RefreshTokenService.generateTokens(user);

        return {
            status: 200,
            success: true,
            message: '',
            ...tokens,
        };
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

    static getNewToken = async(refreshToken) => {
        if (!refreshToken) return;

        RefreshTokenService.verifyRefreshToken(refreshToken)
        .then(({ tokenDetails }) => {
            const payload = {
                sub: tokenDetails.sub,
                name: tokenDetails.name,
                email: tokenDetails.email,
                avatar: tokenDetails.avatar,
            };

            const accessToken = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expires: "1m" }
            );

            return { error: false, accessToken };
        })
        .catch(({ message }) => {
            console.error(message);
            return {
                error: true,
                message,
            }
        });
    }

    static logout = async (refreshToken) => {
        if (!refreshToken) return;
        try {  
            await RefreshTokenService.removeToken(refreshToken);
            return { error: false, status: 200, message: "Logged Out Successfully" };
        } catch (error) {
            console.log(err);
            return {
                error: true,
                status: 500,
                message: "Internal server error"
            }
        }
    }
}

export default AuthService;
