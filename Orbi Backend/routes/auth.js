import express from 'express';
import { validationResult, body } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/User.js';
import findToken from '../middleware/findToken.js';

const router = express();

router.post('/sigin', [
    body('name').isLength(5).withMessage('Enter a name of length min 5'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength(5).withMessage('Enter a valid password of length 5'),
    body('phone').isNumeric().isLength(10).withMessage('Enter a valid phone number'),
    body('address').isLength(5).withMessage('Enter a valid address'),
    body('country').isLength(2).withMessage('Enter a valid Country'),
], async (req, res) => {
    try {

        const error = validationResult(req);

        if (!error) {
            return res.status(400).send({ error: 'Internal Error Occurred' });
        }

        const { name, email, password, phone, address, country } = req.body;

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).send('User Already Exist');
        }

        const hashPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            phone: phone,
            address: address,
            country: country,
        });
        const data = {
            userId: {
                id: user.id
            }
        };

        const Secrete = 'VivekIsCollegeStudent';

        const jwtToken = jwt.sign(data, Secrete);

        res.status(200).send({ jwtToken });

    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal Error Occurred' });
    }
});

router.post('/login', [
    body('name').isLength(5).withMessage('Enter a valid name'),
    body('email').isEmail().withMessage('Enter a valid Email'),
    body('password').isLength(5).withMessage('Enter a valid password'),
], async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).send({ error: 'Internal Error Occurred' });
        }

        const user = await User.findOne({email:req.body.email});

        if (!user) {
            return res.status(400).send({ error: "User Not Exist" });
        }

        const isMatched = bcrypt.compare(req.body.password, user.password);

        if (!isMatched) {
            return res.status(400).send({ error: 'authonication denied' });
        }

        const data = {
            userId: {
                id: user.id,
            },
        };

        const secrete = 'VivekIsCollegeStudent';

        const jwtToken = jwt.sign(data, secrete);

        res.status(200).send({ jwtToken });

    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal Error Occurred' });
    }
});

router.get('/getUserInfo', findToken, async (req, res) => {
    try {

        const userId = await req.user;

        if (!userId) {
            return res.status(400).send({ error: "User Not Found" });
        }

        const user = await User.findById(userId);

        res.status(200).send({ user });

    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal Error Occurred' });
    }
});


export default router;