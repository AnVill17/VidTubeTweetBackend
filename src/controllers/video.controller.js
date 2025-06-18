import mongoose, {isValidObjectId} from "mongoose"
import { Video } from "../models/video.models.js"
import {User} from "../models/user.models.js"
import { ApiError } from "../utils/Apierror.js"
import {ApiResponse} from "../utils/apiresponse.js"
import {asyncHandler} from "../utils/AsyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const video=await Video.findById(videoId)
    if(!video)
        throw new ApiError(404,"Video not found")
    return res
    .status(200)
    .json(new ApiResponse(200,video,"video fetched successfully"))
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail
     if(!videoId)
        throw new ApiError(404,"id not found")
    const {title,description}=req.body
    const thumbnailPath=req.files?.path
    if(!title||!description||!thumbnailPath)
    {
        throw new ApiError(407,"changes not found")
    }
    let thumbnail=await uploadOnCloudinary(thumbnailPath)
    let video=await Video.findByIdAndUpdate(videoId,{
        $set:{
           title,
           description,
           thumbnail:thumbnail.url
        },
        
    },
        {
            new:true
        })
        return res
        .status(200)
        .json(new ApiResponse(200,video,"changes successfully done"))

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!videoId)
        throw new ApiError(404,"id not found")
    let video=await Video.findById(videoId)
    await deleteFromCloudinary(video.thumbnail)
    if(!video)
        throw new ApiError(407,"video not found")
    await Video.findByIdAndDelete(videoId)
    return res
    .status(202)
    .json(new ApiResponse(202,{},"deleted"))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}