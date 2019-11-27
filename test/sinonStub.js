var sinon = require('sinon');
var stub = sinon.stub();
var axios = require('axios')

stub('hello from stub');

//console.log(stub);
console.log(stub.firstCall.args); //output: ['hello']

function saveUser(user, callback) {
    axios.post('/users', {
        first: user.firstname,
        last: user.lastname
    }, callback);
}

describe('saveUser', function() {
    it('should call callback after saving user', function() {

        //We'll stub $.post so a request is not sent
        var post = sinon.stub(axios, 'post');
        post.yields();

        //We can use a spy as the callback so it's easy to verify
        var callback = sinon.spy();

        saveUser({ firstname: 'Han', lastname: 'Solo' }, callback);

        post.restore();
        sinon.assert.calledOnce(callback);
    });
});

describe('saveUser with expected params', function() {
    it('should send correct parameters to the expected URL', function() {

        //We'll stub $.post same as before
        var post = sinon.stub(axios, 'post');

        //We'll set up some variables to contain the expected results
        var expectedUrl = '/users';
        var expectedParams = {
            first: 'Expected first name',
            last: 'Expected last name'
        };

        //We can also set up the user we'll save based on the expected data
        var user = {
            firstname: expectedParams.first,
            lastname: expectedParams.last
        }

        saveUser(user, function(){} );
        post.restore();

        sinon.assert.calledWith(post, expectedUrl, expectedParams);
    });
});
