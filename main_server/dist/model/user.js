"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById_favorite_video = exports.updateUserById_favorite_post = exports.updateUserById = exports.createUser = exports.getUserById = exports.getUserByEmail = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    hashedpassword: { type: String, required: true },
    favoriteposts_id: { type: Array, required: true },
    favoritevideos_id: { type: Array, required: true },
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
const getUsers = () => exports.UserModel.find();
exports.getUsers = getUsers;
const getUserByEmail = (email) => exports.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => exports.UserModel.findById(id);
exports.getUserById = getUserById;
const createUser = (values) => {
    const user = new exports.UserModel(values);
    const result = user.save();
    return result;
};
exports.createUser = createUser;
const updateUserById = (id, values) => exports.UserModel.findByIdAndUpdate(id, values);
exports.updateUserById = updateUserById;
const updateUserById_favorite_post = (id, values) => exports.UserModel.findByIdAndUpdate(id, { $push: { favoriteposts_id: values } });
exports.updateUserById_favorite_post = updateUserById_favorite_post;
const updateUserById_favorite_video = (id, values) => exports.UserModel.findByIdAndUpdate(id, { $push: { favoritevideos_id: values } });
exports.updateUserById_favorite_video = updateUserById_favorite_video;
