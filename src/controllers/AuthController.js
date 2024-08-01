import AuthService from "../services/AuthService.js";

class AuthController {
    
    static login = async (req, res) => {
        try {
            const { user, accessToken } = await AuthService.loginUser(req.body);
    
            return res.status(200).json({
                user,
                accessToken,
            });
        } catch (error) {
           res.status(500);
           console.log(error);
        }
    }
    
    static register = async (req, res) => {
        try {
            const user = await AuthService.registerUser(req.body);
            return res.status(201).json({ user });
        } catch (error) {
           res.status(500);
           console.log(error);
        }
    }
}

export default AuthController;
