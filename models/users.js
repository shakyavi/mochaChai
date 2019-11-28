const mongoose = require("mongoose")
const enumVars = require("../config/enumVariables")
const {stringLength} = require("../config/dataTypeLength")
var ObjectId = mongoose.Schema.Types.ObjectId
const moment = require("moment")


const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            unique: true,
            sparse: true,
            max: stringLength.username,
            default: "",
            es_indexed: true
        },
        firstName: {
            type: String,
            default: "",
            max: stringLength.title,
            text: true,
            es_indexed: true
        },
        lastName: {
            type: String,
            default: "",
            max: stringLength.title,
            text: true,
            es_indexed: true
        },
        countryCode: {type: String, required: true},
        contactCode: {type: String, required: true},
        contactNumber: {type: String, required: true, text: true},
        codeContactNumber: {type: String, required: true, es_indexed: true},
        contactVerifyToken: {type: String, default: ""},
        isContactVerified: {type: Boolean, default: false},
        contactVerifiedAt: {type: Number, default: ""},
        email: {type: String, default: ""},
        website: {type: String, default: ""},
        emailVerifyToken: {type: String, default: ""},
        isEmailVerified: {type: Boolean, default: false},
        emailVerifiedAt: {type: Number, default: ""},
        registeredFrom: {
            type: String,
            required: true,
            enum: enumVars.registeredFrom,
            default: "APP"
        },
        registeredId: {type: String, default: ""},
        profilePhoto: {type: String, default: "", max: stringLength.uri, es_indexed: true},
        birthDate: {type: Date, default: ""},
        gender: {type: String, default: ""},
        relationShipStatus: {type: String, default: ""}, //should be enum,value is unknown
        userStatus: {type: String, default: ""},
        profileVisibleToExplore: {type: Boolean, default: true},
        relationVisibleToFriends: {type: Boolean, default: true},
        autoTranslate: {type: Boolean, default: true},
        status: {type: Number, enum: enumVars.userStatus, default: 0},
        followRequest: [{type: ObjectId, ref: "users", default: []}],
        mutedUsers: [{type: ObjectId, ref: "users", default: []}],
        fanFriend: {
            type: [
                {
                    userId: {type: ObjectId, ref: "users"},
                    isFriend: {type: Boolean, default: false}
                }
            ],
            default: [],
            es_indexed: true,
            es_type: 'nested',
            es_include_in_parent: true,
        },
        blockedByMe: [{type: ObjectId, ref: "users", default: [], es_indexed: true}],
        blockedToMe: [{type: ObjectId, ref: "users", default: [], es_indexed: true}],
        tcAcceptedAt: {type: Number, default: moment.utc().unix()},
        role: {type: String, enum: enumVars.userRole, default: "user"},
        fbId: {type: String, default: ""},
        lnId: {type: String, default: ""},
        fbAccessToken: {
            token: {
                type: String,
                default: ""
            },
            createdAt: {
                type: Number
            },
            expiresIn: {
                type: Number,
                default: ""
            }
        },
        profileCompletedStatus: {type: Boolean, default: false},
        accountDeletedAt: {type: Date, es_indexed: true, es_type: "date", default: null,},
        badgeCount: {type: Number, default: 0}
    },
    {
        timestamps: true,
        toObject: {virtuals: true},
        toJSON: {virtuals: true}
    }
)


userSchema.index({ 'firstName': 'text', 'lastName': 'text', 'contactNumber': 'text' })
userSchema.index({ "homeTown.loc": "2dsphere" });
userSchema.index({ "datingPostSettings.location.loc": "2dsphere" });

userSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName
})


const users = mongoose.model("users", userSchema);

module.exports = users
