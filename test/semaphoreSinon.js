var sinon = require('sinon');
var spy = sinon.spy();
var stub = sinon.stub();
const userModel = require('../models/users')

function setupNewUser(info, callback) {
    var user = {
        name: info.name,
        nameLowercase: info.name.toLowerCase()
    };

    try {
        userModel.saveUser(user, callback);
    }
    catch(err) {
        callback(err);
    }
}

describe('Semaphore Stub tutorial', () => {

    describe('Using Spy', () => {

        it('should call save once', function () {
            var save = sinon.spy(userModel, 'saveUser');

            setupNewUser({name: 'test'}, function () {
            });

            save.restore();
            sinon.assert.calledOnce(save);
        });
    })

    describe('Using Stub', () => {

        it('should pass object with correct values to save', function () {
            var save = sinon.stub(userModel, 'saveUser');
            var info = {name: 'test'};
            var expectedUser = {
                name: info.name,
                nameLowercase: info.name.toLowerCase()
            };

            setupNewUser(info, function () {
            });

            save.restore();
            sinon.assert.calledWith(save, expectedUser);
        });

        it('should pass the error into the callback if save fails', function() {
            var expectedError = new Error('oops');
            var save = sinon.stub(userModel, 'saveUser');
            save.throws(expectedError);
            var callback = sinon.spy();

            setupNewUser({ name: 'foo' }, callback);

            save.restore();
            sinon.assert.calledWith(callback, expectedError);
        });

    })
    describe('Using Mock', () => {
        it('should pass object with correct values to save only once', function() {
            var info = { name: 'test' };
            var expectedUser = {
                name: info.name,
                nameLowercase: info.name.toLowerCase()
            };
            var userM = sinon.mock(userModel);
            userM.expects('saveUser').once().withArgs(expectedUser);

            setupNewUser(info, function() { });

            userM.verify();
            userM.restore();
        });
    })

});