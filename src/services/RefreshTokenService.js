import jwt from 'jsonwebtoken';
import UserTokenModel from '../entities/userToken.js';

class RefreshTokenService {
    static generateTokens = async (user) => {
        if (!user) return new Error('User should be not empty!');
    
        try {
            const userPayload = {
                sub: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar || "",
            };
    
            const accessToken = jwt.sign(
                userPayload,
                process.env.JWT_SECRET,
                { expiresIn: "15m" }
            );
    
            const refreshToken = jwt.sign(
                userPayload,
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: "31d" }
            );
    
            const userToken = await UserTokenModel.findOne({ userId: user._id }).lean();
            if (userToken) await UserTokenModel.deleteOne({ token: userToken.token });
    
            await new UserTokenModel({ userId: user._id, token: refreshToken }).save();
        
            return { user: userPayload, accessToken, refreshToken };
    
        } catch (err) {
            return Promise.reject(err);
        }
    };
    
    static verifyRefreshToken  = async (refreshToken) => {
        if (!refreshToken) return;
    
        return new Promise(async (resolve, reject) => {
            const token = await UserTokenModel.findOne({ token: refreshToken }).lean();
    
            if (!token) reject({ error: true, message: "Invalid refresh token" });
    
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, tokenDetails) => {
                if (err) return reject({ error: true, message: "Invalid refresh token" });
                
                resolve({
                    tokenDetails,
                    error: false,
                    message: "Valid refresh token",
                });
            });
        })
    }

    static removeToken = async (refreshToken) => {
        if (!refreshToken) return new Error({ error: true, status: 422, message: "Token value can't be empty!" });

        const token = await UserTokenModel.findOne({ token: refreshToken }).lean();

        if (!token) return { error: true, status: 404, message: "Token not found" };

        await UserTokenModel.deleteOne({ token: refreshToken });

        return {
            status: 200,
            message: 'Deleted successfully',
            error: false,
        }
    }
}


export default RefreshTokenService;
