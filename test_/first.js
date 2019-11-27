const assert = require('assert');

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});

describe("Math",function(){

    describe('#1',function () {
        it('should return product of two integers',function () {
            assert.equal(9,(3*3))
        })
    })

    describe('#2',function () {
        it('should solve the following [ (a-b)*c ]',function () {
            assert.equal(-8,(3-4)*8)
        })
    })

});