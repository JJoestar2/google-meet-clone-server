import UsersService from "../services/UsersService.js";

class UsersController {

    static getAll = async (_, res) => {
        try {
            const users = await UsersService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: err.message });
        }
    }
    
    static getById = async (req, res) => {
        try {
            const users = await UsersService.getUserById(req.params.id);
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: err.message });
        }
    }
    
    static getByEmail = async (req, res) => {
        try {
            const user = await UsersService.getUserByEmail(req.params.email);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: err.message });
        }
    }
    
    static create = async (req, res) => {
        try {
            const user = await UsersService.createUser(req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: err.message });
        }
    }
    
    static remove = async (req, res) => {
        try {
            const user = await UsersService.deleteUser(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default UsersController;
