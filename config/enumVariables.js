// const {VISIBILITY_PUBLIC, VISIBILITY_PRIVATE,VISIBILITY_FRIENDS,VISIBILITY_FANS} = customFileLoader.loadConstants('default');
const enumVars = {
    userStatus: [0, 1, 2],
    userRole: ['admin', 'user'],
    gender: ['Male', 'Female', 'Others'],
    petSize: ['Small', 'Small X', 'Big'],
    petColor: ['Black', 'White'],
    registeredFrom: ['APP', 'FB', 'G', 'LI'],
    petBreedStatus: [0, 1, 2],
    // postVisibility: [VISIBILITY_PUBLIC,VISIBILITY_PRIVATE,VISIBILITY_FANS,VISIBILITY_FRIENDS],
    updatePostVisibility:['public','private'],
    postStatus: [0, 1],
    audioVideoPhoto: ['Audio', 'Video', 'Photo'],
    postDocumentsType:['audio','video','photo','gif','sticker'],
    importedFrom: ['APP', 'FB', 'G', 'LI'],
    locationCategoriesStatus: [0, 1],
    postType: ['normal', 'dating'],
    postLikeStarredStatus:['liked','starred'],
    commentContentType: ['text', 'photo','gif','sticker'],
    contactImportedFrom: ['APP', 'FB', 'G', 'LI'],
    pageType: ['termsCondition','samplePage'],
    tempTokenFor: ['REG', 'FP'],
    deviceType: ["1", "2"], // 1 =>android 2= IOS
    followActions:['fan','friend','decline'],
    getModelsObject: (fileName) => {
        return require('../models/' + fileName);
    },
    languageAgent: ['server', 'app'],
    GEO_JSON_TYPES: {//do not change this object used in schema level
        POINT:"Point",
        LINESTRING:"LineString",
        POLYGON:"Polygon",
        MULTIPOINT:"MultiPoint",
        MULTILINESTRING:"MultiLineString",
        MULTIPOLYGON:"MultiPolygon",
        GEOMETRYCOLLECTION:"GeometryCollection"
    },
    // privacySettingVisibility : [VISIBILITY_PUBLIC,VISIBILITY_PRIVATE,VISIBILITY_FANS,VISIBILITY_FRIENDS],
    followRequestActions:["manual","fan","friend"],
    datingGoal : ["datingCasual","friendship","seekingLove","soulMate"],
    commentDirection:['new','old','none'],
    likeDislikePost:['like','dislike'],
    listFanFriend:['fan','friend'],
    blockUnblock:['block','unblock'],
    notificationGroup : ["posts","story","chat","contactSync"],
    userNameLength:15,
    deletedField : ['user','story'],
    chatReportType: ['user', 'group']

};

module.exports = enumVars;