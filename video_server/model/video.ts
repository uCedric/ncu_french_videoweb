import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    owneremail:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    url:{type:String,required:true},
    views:{type:Number,required:false},
    date:{type:Date,required:true},
});

export const VideoModel = mongoose.model('Video',VideoSchema);

export const getVideos = () => VideoModel.find();

export const getVideoById = (id:string)=> VideoModel.findById(id);

export const getVideoByOwnerEmail = (owneremail:string)=> VideoModel.findOne({owneremail});

export const createVideo = (values:Record<string,any>) => {
    const video = new VideoModel(values);
    const result = video.save();
    return result;
};

export const updateVideoById = (id: string, values: Record<string, any>) => VideoModel.findByIdAndUpdate(id, values);
