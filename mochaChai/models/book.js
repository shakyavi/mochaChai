let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//book schema definition
let BookSchema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        year: { type: Number, required: true },
        pages: { type: Number, required: true, min: 1 },
        price : { type: Number, default: 150},
        qty : {type : Number, default : 10},
        createdAt: { type: Date, default: Date.now },
    },
    {
        versionKey: false
    }
);

// Sets the createdAt parameter equal to the current time
BookSchema.pre('save', next => {
    now = new Date();
    if(!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

BookSchema.statics.findBook=function (condition) {
    return this.find(condition);
};

BookSchema.statics.totalAsset = async function(){
    return await this.aggregate([
        {
            $project : {
                _id:1,
                price:1,
                qty:1,
                sum: { $multiply : ["$price","$qty"] }
            }
        },
        { $group: { _id : null, totalSum : { $sum: "$sum" } } }
    ]);
}

//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('book', BookSchema);