module.exports = {
    callbackCheckBet(gameData, betWonCallBack, betLostCallBack) {
        let team = gameData.team;
        let teamWon = gameData.teamWon;
        let teamScored2More = gameData.teamScored2more;

        if (teamWon == true && teamScored2More == true) {
            return betWonCallBack(`Hurray ${team} won and also scored two more. You won your bet`);
        } else if (teamWon == true && teamScored2More == false) {
            return betLostCallBack(`${team} won but didn\'t score 2 more. You lost your bet`);
        } else if (teamWon == false) {
            return betLostCallBack(`${team} lost.You lost your bet.`);
        } else {
            return betLostCallBack('You lost your bet.')
        }
    },
    promiseCheckBet(gameData){
        let team = gameData.team;
        let teamWon = gameData.teamWon;
        let teamScored2More = gameData.teamScored2more;
        return new Promise( (resolve,reject)=>{
            if (teamWon == true && teamScored2More == true) {
                return resolve(`Hurray ${team} won and also scored two more. You won your bet`);
                // return betWonCallBack(`Hurray ${team} won and also scored two more. You won your bet`);
            } else if (teamWon == true && teamScored2More == false) {
                return reject(`${team} won but didn\'t score 2 more. You lost your bet`);
                // return betLostCallBack(`${team} won but didn\'t score 2 more. You lost your bet`);
            } else if (teamWon == false) {
                return reject(`${team} lost.You lost your bet.`);
                // return betLostCallBack(`${team} lost.You lost your bet.`);
            } else {
                return reject('You lost your bet.')
                // return betLostCallBack('You lost your bet.')
            }
        } );

    }
}
