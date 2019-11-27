let mongoose = require("mongoose");
let chai = require('chai');
let should = chai.should();
let expect = chai.expect;

const testService = require('../services/testService');

describe('Test Services', () => {

    describe('#1 getText', () => {

        it('#a it should return the given input string (\'string\')', async () => {
            let stringText = await testService.getText('string');
            stringText.should.be.a('string', 'type string received');
            stringText.should.equal('string', 'equals to string');
        })

        it('#b it should return false on empty or null value', async () => {

            let emptyString = await testService.getText('');
            expect(emptyString, 'false on empty string').to.be.false;


            let nullValue = await testService.getText(null);
            expect(nullValue, 'false on null').to.be.false;
        })

    });

    describe('#2 getStringLength', () => {

        it('#a it should return (6) numeric length of given text (\'string\')', async () => {
            let strLength = await testService.getStringLength('string');
            strLength.should.be.a('number', 'type number received');
            strLength.should.equal(6, 'equals to 6');
        })

        /*it('#b it should return false on empty or null value', async () => {

            let emptyString = await testService.getText('');
            expect(emptyString, 'false on empty string').to.be.false;

            let nullValue = await testService.getText(null);
            expect(nullValue, 'false on null').to.be.false;
        })*/

    });
});