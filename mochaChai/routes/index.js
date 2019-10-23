const {callbackCheckBet, promiseCheckBet} = require('../checkBet');
const bookRoutes = require('../routes/book');

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.status(200).json({message: 'Hello world. How are you?'});
    });

    app.get('/callCheckBet/:team/:won/:scored2more', (req, res) => {
        let checkBetResult = callbackCheckBet(
            {
                team: req.params.team,
                teamWon: req.params.won == 'true',
                teamScored2more: req.params.scored2more == 'true'
            },
            (won) => {
                console.log('Bet Won');
                console.log(won);
                return won;
            },
            (lost) => {
                console.log('Bet Lost')
                console.log(lost);
                return lost;
            }
        );
        res.status(200).json({message: 'Success', betResult: checkBetResult});
    });

    app.get('/promiseCheckBet/:team/:won/:scored2more', (req, res) => {
        let checkBetResult = promiseCheckBet(
            {
                team: req.params.team,
                teamWon: req.params.won == 'true',
                teamScored2more: req.params.scored2more == 'true'
            })
            .then((won) => {
                console.log('Bet Won');
                console.log(won);
                return won;
            })
            .catch((lost) => {
                console.log('Bet Lost');
                console.log(lost);
                return lost;
            });
        res.status(200).json({message: 'Success', betResult: checkBetResult});
    });

    app.use('/bookStore',bookRoutes);
}