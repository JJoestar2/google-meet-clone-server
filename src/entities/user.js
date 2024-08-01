import mongoose, { Types } from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: {
        type: Types.ObjectId,
        auto: true, // todo move it to abstract class or smth like that to extend it
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
    lastActivity: { type: Date, default: Date.now },
}, { timestamps: true });

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
