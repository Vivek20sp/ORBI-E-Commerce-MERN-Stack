import express from 'express';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_API_KEY_ID,
    key_secret: process.env.RAZOR_PAY_API_KEY_SECRET,
});

router.post('/order', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ error: 'Invalid Data Recived' });
        }
        const options = {
            amount: req.body.amount,
            currency: req.body.currency,
            payment_capture: 1,
        };
        const order = await razorpay.orders.create(options);
        if (!order) {
            return res.status(400).send({ error: 'Internal Error Occurred' });
        }
        res.status(200).send({ order })
    } catch (error) {
        return res.status(400).send({ error });
    }
});



export default router;