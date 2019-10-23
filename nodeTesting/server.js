const express = require('express');
const app = express();
const port = 3000;
const {multiplierFunction} = require('./util');

app.get('/:num/:multiplier',
    (req, res) => {
        let num = req.params.num;
        let multiplier = req.params.multiplier;
        let product = multiplierFunction(num,multiplier);
        res.status(200).json({product : product});
    }
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))