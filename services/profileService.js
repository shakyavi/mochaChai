const userModel = require('../models/users')
/*const deviceModel = customFileLoader.loadModel('devices')
//const postModel = customFileLoader.loadModel('posts')
const commentModel = customFileLoader.loadModel('postComments')
const storyModel = customFileLoader.loadModel('stories')
const postReportModel = customFileLoader.loadModel('postReports')
const deleteLogsModel = customFileLoader.loadModel('deleteLogs');
const userNotificationModel = customFileLoader.loadModel('userNotifications');

const uuidv1 = require('uuid/v1')
var https = require('https');
const emailService = customFileLoader.loadServices('mailerService');
const { getTranslation } = customFileLoader.loadHelper('getTranslation');
const { RESEND_EMAIL_VERIFICATION } = customFileLoader.loadConstants('lang');
const userSocialContactsModel = customFileLoader.loadModel('userSocialContacts');
const moment = require('moment');*/

module.exports = {
    getFriendShipStatus:async (currentUserId, otherUserId)=> {
        let users = await userModel.count();
        //let users = await userModel.find({},{_id:1,email:1,contactNumber:1}).limit(5);
        console.log(users);
        //get current user filter if other user has requested me or im following
        let currentUser = await userModel.findOne({_id:currentUserId}, {
            _id: 1,
            followRequest: { $elemMatch: { "$eq": otherUserId } },
            fanFriend: { $elemMatch: { "userId": otherUserId, "isFriend": false } }
        })
        console.log(currentUser,currentUserId,typeof currentUserId);
        if(!currentUser){
            throw new Error('invalid current user id');
        }
        //check if other user has requested current user
        let friendRequest = (currentUser.followRequest.length > 0) ? true : false
        let follow = 'not-requested'
        //other user
        let otherUser = await userModel.findOne({ _id: otherUserId }, {
            _id: 1,

            followRequest: { $elemMatch: { "$eq": currentUserId } },
            fanFriend: { $elemMatch: { "userId": currentUserId } }
        })
        if (otherUser.followRequest.length > 0) {
            follow = "requested"
        } else if (otherUser.fanFriend.length > 0) {
            //check if other user is my fan or friend
            follow = (otherUser.fanFriend[0].isFriend) ? "friend" : "fan"
            //check fan friend
        } else {
            if (currentUser.fanFriend.length > 0) {
                follow = 'following'
            }

        }
        let response = {
            follow,
            friendRequest
        }
        return response
    },
    /*verificationEmail: async (data) => {

        let verificationUniqueId = uuidv1();//unique id for verification email
        let httpCode = "";
        let msg = "";

        //if user not verified then send email
        let verification_link = config.siteInformation.siteUrl + "v1/user/verifyEmail/" + verificationUniqueId;
        //send verification email
        let emailObj = {
            emailTo: data.user.email,
            subject: 'Email verification',
            templateName: 'verificationTemplate',
            emailObjVariables: {
                userName: data.user.firstName,
                emailVerificationLink: verification_link,
                siteName: config.siteInformation.siteName,
                siteContactNumber: config.siteInformation.siteContactNumber,
                siteEmail: config.siteInformation.siteEmail

            }
        }
        emailService.triggerEmail(emailObj);//trigger email
        userModel.updateOne({ _id: data.user._id }, { $set: { emailVerifyToken: verificationUniqueId } }).exec();

        httpCode = RESEND_EMAIL_VERIFICATION.RESEND_EMAIL_SUCCESS.httpCode;
        msg = await getTranslation(RESEND_EMAIL_VERIFICATION.GROUP, RESEND_EMAIL_VERIFICATION.RESEND_EMAIL_SUCCESS.message, data.user.selectedLang);
        return { httpCode: httpCode, msg: msg }


    },
    remoteUrlReq: async (data) => {
        return new Promise((resolve, reject) => {

            const reqRemote = https.request(data.options, (res) => {
                var body = '';
                res.on('data', (chunk) => {
                    body += chunk;
                })

                res.on('end', function () {
                    let fbResponse = JSON.parse(body)
                    resolve(fbResponse)

                })
            })
            reqRemote.on('error', function (e) {

                reject(e);

            });

            reqRemote.end();
        })

    },
    saveSocialSync: async (data) => {
        let { fetchFbFriends, user, fbReqCount } = data
        let currentUserId = user._id
        let set = {}
        let where = {}
        let condt = {}

        for (let fbContact of fetchFbFriends.data) {
            let checkUsers = await userModel.find(
                {
                    _id: { $ne: currentUserId },
                    fbId: fbContact.id, user: { $ne: currentUserId },
                    blockedByMe: {
                        $not: { $elemMatch: { $eq: currentUserId } }
                    },
                    blockedToMe: {
                        $not: { $elemMatch: { $eq: currentUserId } }

                    }
                },
                {
                    _id: 1,
                    fbId: 1
                    //codeContactNumber: 1,
                    //followRequest: { $elemMatch: { "$eq": currentUserId } },
                    //fanFriend: { $elemMatch: { "userId": currentUserId } }
                }
            )
            for (let checkUser of checkUsers) {
                let getFriendShipStatus = await self.getFriendShipStatus(currentUserId, checkUser._id)
                let follow = getFriendShipStatus.follow
                let friendRequest = getFriendShipStatus.friendRequest

                where = { user: user._id, fbId: fbContact.id, contactOf: checkUser._id }
                set = {
                    follow: follow,
                    name: fbContact.name,
                    importedFrom: 'FB',
                    friendRequest: friendRequest,
                    picture: {
                        height: fbContact.picture.data.height,
                        width: fbContact.picture.data.width,
                        url: fbContact.picture.data.url
                    }
                }
                condt = { upsert: true, setDefaultsOnInsert: true, runValidators: true }
                if (fbReqCount === 1) {
                    await userSocialContactsModel.updateOne(where, { $set: set }, condt).exec()
                } else {
                    userSocialContactsModel.updateOne(where, { $set: set }, condt).exec()
                }
            }

        }
    },
    //get ohter users post visibility while viewing profile
    getOtherUsersPostVisibility: async(currentUserId,otherUserId)=>{
        let postVisibility= ['public']
        let otherUser = await userModel.profileById(otherUserId, { privacySettings: 1 })
        let postViewing = otherUser.privacySettings.postViewing
        if (postViewing=='private'){
            return false
        }else{
            let friendShip = await self.getFriendShipStatus(currentUserId,otherUserId)
            console.log('follow is',friendShip.follow)
            if(friendShip.follow=='friend'|| friendShip.follow=='following'){
                //if not fan friend
               if(friendShip.follow=='friend' && postViewing=='friends'){
                   //get post for friend
                postVisibility.push('friends')
               }

               if(friendShip.follow=='following' && postViewing=='fans'){
                   //get post for fan
                   postVisibility.push('fans')
               }
            }
        }
        
        return postVisibility
    },
    deleteUser: async (userId) => {
        let deletedAt = moment.utc().unix();

        let deleteLogObj = {
            userId:userId,
            deletedField:'user',
            deletedId:userId,
            deletedAt: deletedAt
        };
        let deleteLog = new deleteLogsModel(deleteLogObj);
        deleteLog.save();

        await deviceModel.removeUserDevices(userId)
        let getPosts = await commentModel.find({ commentedBy: userId })
        if (getPosts.length > 0) {
            for (let getPost of getPosts) {
                await postModel.findOneAndUpdate({ _id: getPost.post }, { $inc: { totalComments: -1 } })
            }

            await commentModel.deleteMany({ commentedBy: userId })
        }

        //remove from others pot
        await postModel.updateMany({}, { $pull: { taggedPeople: userId, likedBy: userId } })
        //remove post
        await postModel.deleteMany({ postedBy: userId })
        //remove from other users
        await userModel.updateMany({},
            {
                $pull: {
                    blockedToMe: userId,
                    mutedUsers: userId,
                    followRequest: userId,
                    fanFriend: userId
                }
            })

        //remove from user notifications
        await userNotificationModel.deleteMany({},{userId:userId});
        //remove from user
        await userModel.deleteOne({ _id: userId })
        await storyModel.deleteOne({ reportBy: userId })
        await postReportModel.deleteOne({ postedBy: userId })

    },
    softDeleteUser: async (userOid,softDelete=true) => {
        try {
            let setAccountDeletedAt = {accountDeletedAt : null};
            //update accountDeletedAt timestamp :
            if(softDelete==true) {
                let deletedAt = moment.utc().unix();
                setAccountDeletedAt = {accountDeletedAt: deletedAt}

                // remove device tokens
                await deviceModel.removeUserDevices(userOid)
            }
            // stories
            let updateStories = await storyModel.updateMany({postedBy:userOid},{$set:setAccountDeletedAt})

            // posts
            let updatePosts = await postModel.updateMany({postedBy:userOid},{$set:setAccountDeletedAt },{useFindAndModify: false,new: true})
            // postComments
            let updatePostComments = await commentModel.updateMany({commentedBy:userOid},{$set:setAccountDeletedAt })
            // comment count in parent posts
            // postReports
            let updatePostReports = await postReportModel.updateMany({reportedBy:userOid},{$set:setAccountDeletedAt })

            // userNotifications
            let updateUserNotifications = await userNotificationModel.updateMany({userId:userOid},{$set:setAccountDeletedAt})

            // users
            let updateUser = await userModel.update({_id:userOid},{$set:setAccountDeletedAt},{useFindAndModify: false,new: true})


        } catch (e) {
            console.log('user model delete error : ', e);
        }
    }*/
    /*getFollowStatus: async (currentUserId, otherUserId) => {

        let follow = 'not-requested'
        //other user
        let otherUser = await userModel.findOne({ _id: otherUserId }, {
            _id: 1,
            followRequest: { $elemMatch: { "$eq": currentUserId } },
            fanFriend: { $elemMatch: { "userId": currentUserId } }
        })
        if (otherUser.followRequest.length > 0) {
            follow = "requested"
        } else if (otherUser.fanFriend.length > 0) {
            //check if other user is my fan or friend
            follow = (otherUser.fanFriend[0].isFriend) ? "friend" : "fan"
            //check fan friend
        } else {
            let currentUser = await userModel.findById(currentUserId, {
                _id: 1,
                followRequest: { $elemMatch: { "$eq": otherUserId } },
                fanFriend: { $elemMatch: { "userId": otherUserId, "isFriend": false } }
            })
            if (currentUser.fanFriend.length > 0) {
                follow = 'following'
            }

        }
        let response = {
            follow
        }
        return response
    }*/

}