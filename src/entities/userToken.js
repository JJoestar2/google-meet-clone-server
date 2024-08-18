import mongoose, { Types } from "mongoose";

const UserTokenSchema = new mongoose.Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now, expires: 180000 },
});

const UserTokenModel = mongoose.model('UserToken', UserTokenSchema);
export default UserTokenModel;