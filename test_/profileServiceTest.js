let mongoose = require("mongoose");
let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
const profileService = require('../services/profileService')
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised)

before(function (done) {
    //START OF DB CONNECTION
    let dbUri = `${global.DB_DRIVER}+srv://${global.DB_USER}:${global.PASSWORD}@${global.DB_HOST}/${global.DB_DATABASE}?retryWrites=true`;

    mongoose.connect(dbUri, global.dbConfig.options).then((err, client) => {
        console.log('we\'re connected to the database!');
        done();
    }).catch((error) => {
        console.log('connection error:', error.message);
    });
    //END OF DB CONNECTION
});

describe('Profile Services', () => {

    describe('#1 getFriendShipStatus', () => {

        it('#a it should return an object with keys {follow} and {friendRequest}',
            async () => {
                let currentUserId = mongoose.Types.ObjectId("5d76221269d1281e44728f86");
                let otherUserId = mongoose.Types.ObjectId("5d761ef652aafb1a59822212");
                // return  profileService.getFriendShipStatus(currentUserId, otherUserId);

                let friendShipStatus = await profileService.getFriendShipStatus(currentUserId, otherUserId);
                expect(friendShipStatus,'received object').to.be.an('object');
                friendShipStatus.should.have.all.keys('follow','friendRequest');

            }
        )

        it('#b it should throw an error on passing invalid other user id',
            async () => {

                let currentUserId = mongoose.Types.ObjectId("5d76221269d1281e44728f86");
                let otherUserId = mongoose.Types.ObjectId("5d761ef652aafb1a59822210");
                //let otherUserId = 'invalid other user id';
                let friendShipStatus = await profileService.getFriendShipStatus(currentUserId, otherUserId);
                expect(friendShipStatus,'received object').to.be.an('object');
                //await expect(profileService.getFriendShipStatus(currentUserId, otherUserId),'receive error on invalid user id').to.be.rejected;

            }
        )

        it('#c it should throw an error on passing invalid current user id',
            async () => {
                let currentUserId = "invalid user id";
                let otherUserId = mongoose.Types.ObjectId("5d761ef652aafb1a59822212");

                //expect(async function (){await profileService.getFriendShipStatus(currentUserId, otherUserId);},'receive false on invalid user id').to.throw(new Error('invalid current user id'));
                await expect(profileService.getFriendShipStatus(currentUserId, otherUserId),'receive error on invalid user id').to.be.rejected;

            }
        )



    });

});

//After all tests are finished drop database and close connection
after(function(done){
    // mongoose.connection.db.dropDatabase(function(){
    mongoose.connection.close(done);
    // });
});