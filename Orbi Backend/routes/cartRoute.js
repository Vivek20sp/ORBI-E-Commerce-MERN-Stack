import express from 'express';
import Cart from '../model/Cart.js';
import findToken from '../middleware/findToken.js';
import { validationResult, body } from 'express-validator';
import User from '../model/User.js';

const router = express();

router.get('/getCartItems', findToken, async (req, res) => {
    try {
        const userId = await req.user;
        const cartItems = await Cart.find({ user: userId });
        res.status(200).send({ cartItems });
    } catch (error) {
        res.status(400).send({ error: "Internal Server Error" })
    }
});

router.post('/addNewItem', findToken, [
    body('productId').isEmpty().withMessage('Enter a valid ID'),
    body('name').isLength(2).withMessage('Enter a valid name'),
    body('image').isString().withMessage('Enter a valid image'),
    body('price').isNumeric().withMessage('Enter a valid price'),
    body('quantity').isNumeric().withMessage('Enter a valid quantity'),
    body('des').isLength(2).withMessage('Enter a valid Description'),
], async (req, res) => {
    try {

        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).send({ error: 'Internal Error Occurred' });
        }

        const userId = await req.user;

        const { id, name, image, price, quantity, des } = req.body;

        const user = await Cart.findOne({ user: userId });

        const item = new Cart({
            id: id,
            name: name,
            image: image,
            price: price,
            quantity: quantity,
            des: des,
            user: userId,
        });

        item.save();

        res.status(200).send({ item });

    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal Error Occurred' })
    }
});


router.delete('/removeProduct/:id', findToken, async (req, res) => {
    try {
        const userId = await req.user;
        const itemId = req.params.id;
        const item = await Cart.findByIdAndDelete(itemId);
        if (!item) {
            return res.status(400).send({ error: "Item Does Not Exist" });
        }
        if (userId !== item.user.toString()) {
            return res.status(400).send({ error: "Not Authorised" });
        }
        res.status(200).send({ item });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal Error Occurred' })
    }
});

router.delete('/removeAllCartItems', findToken, async (req, res) => {
    try {
        const userId = await req.user;
        if(!userId){
            return res.status(400).send('User Not Present');
        }
        const removeItems = await Cart.deleteMany({user:userId});
        if(!removeItems){
            return res.status(400).send('No Items Found');
        }
        res.status(200).send({removeItems});
    } catch (error) {
        
    }
})

export default router;