import AuthService from "../services/AuthService.js";

class AuthController {
    
    static login = async (req, res) => {
        try {
            const { success, status, user, accessToken, refreshToken, message } = await AuthService.loginUser(req.body);
            
            if (success) return res.status(status).json({ user, accessToken, refreshToken });
            else return res.status(status).json({ message });
        } catch (error) {
           res.status(500);
           console.log(error);
        }
    }
    
    static register = async (req, res) => {
        try {
            const user = await AuthService.registerUser(req.body);
            if (user) return res.status(201).json({ user });
        } catch (error) {
           res.status(500);
           console.log(error);
        }
    }

    static logout = async (req, res) => {
        try {
            const { error, message } = await AuthService.logout(req.body.refreshToken);

            if (error) res.status(500).json({ message });

            return res.status(201).json({ message });
        } catch (error) {
           res.status(500);
           console.log(error);
        }
    };

    static getNewToken = async (req, res) => {
        try {
            const { error, message, accessToken } = await AuthService.getNewToken(req.body.refreshToken);
            
            if (error) res.json({ message });

            return res.json({ accessToken });
        } catch (error) {
           console.log(error);
        }
    };
}

export default AuthController;
