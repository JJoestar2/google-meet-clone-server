import UsersService from "../services/UsersService.js";

class UsersController {

    static getAll = async (_, res) => {
        try {
            const users = await UsersService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    static getById = async (req, res) => {
        try {
            const { success, user, status, message } = await UsersService.getUserById(req.params.id);
            if (success) return res.status(status).json({ user });
            else res.status(status).json({ message });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    static create = async (req, res) => {
        try {
            const user = await UsersService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    static remove = (req, res) => {
        try {
            const { success, user, status, message } = UsersService.deleteUser(req.params.id);
            if (success) return res.status(status).json(user);
            else return res.status(status).json({ message });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default UsersController;
