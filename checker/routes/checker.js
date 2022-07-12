const express = require('express');
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.API_KEY);

router.get('/', (req, res)=>{
    stripe.balance.retrieve(function(err, balance) {
        res.json(balance);
    });
})

router.post('/', (req, res)=>{
    const createToken = async ()=>{

        await stripe.tokens.create({
            card: {
                number: req.body.number,
                exp_month: req.body.exp_month,
                exp_year: req.body.exp_year,
                cvc: req.body.cvc
            }
        }, (err, token)=>{
            if(err){
                if(err.raw.statusCode === 429){
                    createToken();
                }else {
                    res.json(err)
                }
            }else {
                const charge = async ()=>{
                    await stripe.charges.create({
                        amount: 50,
                        currency: 'usd',
                        source: token.id,
                        description: 'My First Test Charge (created for API docs at https://www.stripe.com/docs/api)',
                    }, (err, result)=>{
                        if(err){
                            if(err.raw.statusCode === 429){
                                charge();
                            }else {
                                res.json(err)
                            }
                        }else {
                            res.json(result)
                        }
                    });
                }
                charge();
            }
        });
    }
    createToken();

});

module.exports = router;
