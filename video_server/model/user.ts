import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{type:String,required:true},
    username:{type:String,required:true},
    hashedpassword:{type:String,required:true},
    favoriteposts_id:{type:Array,required:true},
    favoritevideos_id:{type:Array,required:true},
});

export const UserModel = mongoose.model('User',UserSchema);

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email:string)=> UserModel.findOne({email});

export const getUserById = (id:string)=> UserModel.findById(id);

export const createUser = (values:Record<string,any>) => {
    const user = new UserModel(values);
    const result = user.save();
    return result;
} 

export const updateUserById = (id: string, values: Record<string, any>) => UserModel. findByIdAndUpdate(id, values);

export const updateUserById_favorite_post = (id: string, values: Record<string, any>) => UserModel. findByIdAndUpdate(id, {$push:{favoriteposts_id:values}});

export const updateUserById_favorite_video = (id: string, values: Record<string, any>) => UserModel. findByIdAndUpdate(id, {$push:{favoritevideos_id:values}});