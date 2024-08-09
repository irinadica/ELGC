import SECRET_KEY from "../stripe/index"

const stripe=require('stripe')(process.env.SECRET_KEY);
module.exports= async function(req,res){
    const{email,amount}= JSON.parse(req.body);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'gbp',
            receipt_email: email
        })
        res.json({clientSecret: paymentIntent.client_secret});
    } catch (error) {
        res.json({error: error.message});
    }
}