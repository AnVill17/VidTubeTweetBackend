import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.models.js"
import { User } from "../models/user.models.js"
import { ApiError } from "../utils/Apierror.js"
import { ApiResponse } from "../utils/apiresponse.js"


const createTweet = asyncHandler(async (req, res) => {
    const {content}=req.body
    if(!content)
        throw new ApiError(403,"no content found")
    const user=req.user._id
    
    const newTweet=await Tweet.create({
        content,
        owner:user
    })
    if(!newTweet)
        throw new ApiError(409,"error while creating tweet")
    return res
    .status(200)
    .json(new ApiResponse(200,{newTweet},"tweet created successfully"))
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    
    const user=req.user
    let tweets=await Tweet.aggregate(
        [
           { $match:{
                user:user._id
            }
        }
        ]
    )
    if(!tweets)
    {
        throw new ApiError(404,"not bale to find tweets")
    }
    return res
    .status(202)
    .json(new ApiResponse(202,tweets,"done"))

})

const updateTweet = asyncHandler(async (req, res) => {
    
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}