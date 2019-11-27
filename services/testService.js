module.exports = {
    getText: async (text) => {
        return (text) ? text : false;
    },
    getStringLength : async(text)=> {
        return text.length;
    }

};