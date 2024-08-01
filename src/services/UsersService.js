import UserModel from '../entities/user.js';

class UsersService {

   static getAllUsers = () => {
        try {
            return UserModel
            .find()
            .lean();
        } catch (error) {
            console.log(`Error occured ${error}`);
            throw new Error(error);
        }   
    };
    
    static getUserByEmail  = (email) => {
        const user = UserModel.findOne({ email }).lean();
        if (!user) throw new Error('Not found user');
    
        return user;
    }
    
    static getUserById = async (id, projection = null, lean = true) => {
        const user = await UserModel.findById(id, projection).lean(lean);
        if (!user) throw new Error('Not found user');
    
        return user;
    }
    
    static getByEmailAndUpdateActivity = async (email) => {
        const user = await UserModel.findOne({ email });
        if (!user) return null;
    
        const lastVisitedToday = user.lastActivity.toDateString() === new Date().toDateString();
        if (lastVisitedToday) return user.toObject();
    
        user.lastActivity = new Date();
    
        await user.save();
    
        return user.toObject();
    }
    
    static createUser = (userData) => {
        const newUser = new UserModel(userData);
    
        return newUser.save();
    }
    
    static deleteUser = (id) => {
        const user = UserModel.findById(id);
        if (!user) throw new Error('Not found user');
    
        user.deleteOne({ id });
    
        return user;
    }
}

export default UsersService;
