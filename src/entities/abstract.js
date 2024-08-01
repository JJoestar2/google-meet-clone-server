import mongoose, { Types } from "mongoose";

const AbstractSchema = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
    auto: true,
  }
});

const AbstractModel = mongoose.model('AbstractModel', AbstractSchema);

export default AbstractModel;
