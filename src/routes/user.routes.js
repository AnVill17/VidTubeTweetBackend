import { changeAccountDetails, changeAvatar, changeCoverImage, changePassword, getCurrentUser, getUserChannel, loginUser, refreshAccessToken, registerUser, userLogOut, watchHistory } from "../controllers/user.controller.js";



import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";



const router= Router()
router.route("/register").post(
upload.fields([{
    name:"avatar",
    maxCount:1
},{
    name:"coverImage",
    maxCount:1
}]),registerUser
)


router.route("/login").post(loginUser)

router.route("/refresh-access-token").post(refreshAccessToken)


//secured routes
router.route("/change-password").post(verifyJwt,changePassword)

router.route("/current-user").get(verifyJwt,getCurrentUser)

router.route("/change-account-details").patch(verifyJwt,changeAccountDetails)

router.route("/change-avatar").patch(verifyJwt,upload.single("avatar"),changeAvatar)

router.route("/change-cover-image").patch(verifyJwt,upload.single("coverImage"),changeCoverImage)

router.route("/c/:userName").get(verifyJwt,getUserChannel)

router.route("/history").get(verifyJwt,watchHistory)

router.route("/logout").post(verifyJwt,  userLogOut)



export default router
