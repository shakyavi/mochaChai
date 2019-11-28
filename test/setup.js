global.customFileLoader = require('../customFileLoader');
global.DB_DRIVER='mongodb';

/*live
DB_HOST=gochat-live-ofr8u.mongodb.net
DB_PORT=27017
DB_USER=GoChat-live
DB_PASS=GoChat-live@123
DB_DATABASE=gochat-live*/

// draft
global.DB_HOST='gochat-draft-alhog.mongodb.net'
global.DB_PORT=27017;
global.DB_USER='gochatAdmin'
global.DB_PASS='gochat123'
global.DB_DATABASE='gochat-draft'

global.PASSWORD = encodeURIComponent('gochat123');
global.dbConfig = {
    options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        autoIndex: false,
        useUnifiedTopology: true
    }
};