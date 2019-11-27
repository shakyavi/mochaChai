var sinon = require('sinon');
var spy = sinon.spy();
let chai = require('chai');
let assert = chai.assert;

//We can call a spy like a function
spy('Hello', 'World');

//Now we can get information about the call
console.log(spy.firstCall.args); //output: ['Hello', 'World']

var user = {
    setName: function (name) {
        this.name = name;
    }
}

//Create a spy for the setName function
var setNameSpy = sinon.spy(user, 'setName');

//Now, any time we call the function, the spy logs information about it
user.setName('Darth Vader');

//Which we can see by looking at the spy object
console.log(setNameSpy);
console.log(setNameSpy.callCount); //output: 1

//Important final step - remove the spy
setNameSpy.restore();

function myFunction(condition, callback){
    if(condition){
        callback();
    }
}

describe('myFunction', function() {
    it('should call the callback function', function() {
        var callback = sinon.spy();

        myFunction(true, callback);

        assert(callback.calledOnce);
    });
});

describe('myFunction with sinon assertions', function() {
    it('should call the callback function', function() {
        var callback = sinon.spy();

        myFunction(true, callback);

        sinon.assert.calledOnce(callback);
    });
});