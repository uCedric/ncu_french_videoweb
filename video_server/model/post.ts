import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    owneremail:{type:String,required:true},
    title:{type:String,required:true},
    content:{type:String,required:true},
    created_at:{type:Date,required:true},
});

export const PostModel = mongoose.model('Post',PostSchema);

export const getPosts = () => PostModel.find();

export const getPostByOwnerEmail = (owneremail:string)=> PostModel.findById(owneremail);

export const getPostById = (id:string)=> PostModel.findById(id);

export const createPost = (values:Record<string,any>) => {
    const post = new PostModel(values);
    const result = post.save();
    return result;
};

export const updatePostById = (id: string, values: Record<string, any>) => PostModel.findByIdAndUpdate(id, values);

export const deletePostById = (id: string) => PostModel.findByIdAndDelete(id);