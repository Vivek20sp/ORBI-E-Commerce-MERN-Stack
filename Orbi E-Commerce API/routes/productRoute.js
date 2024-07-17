import express from 'express';
import multer from 'multer';
import UploadToCloudinary from '../Cloudinary/cloudinary.js';
import Product from '../model/ProductModel.js';
import fs from 'fs';


const router = express.Router();

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const upload = "./upload";
        fs.mkdirSync(upload, { recursive: true });
        cb(null, upload);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: Storage }).array("files", 2);

router.get('/getAllProduct', async (req, res) => {
    try {
        const items = await Product.find({});
        res.status(200).send({ items });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal Error Occurred' });
    }
});

router.post('/createANewItem', async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.error("Multer error:", err);
            return res.status(500).json({ error: "Error uploading files" });
        } else if (err) {
            console.error("Error:", err);
            return res.status(500).json({ error: "Unknown error" });
        }

        try {
            const files = req.files;

            if (!files || files.length == 0) {
                return res.status(400).send({ error: "Files are required" });
            }

            const imagesURL = [];

            for (let file of files) {
                const localFilePath = file.path;
                const response = await UploadToCloudinary(localFilePath);
                imagesURL.push(response.secure_url);
            }

            const imageUpload = new Product({
                id: req.body.id,
                name: req.body.name,
                image: imagesURL,
                price: req.body.price,
                color: req.body.color,
                badge: req.body.badge,
                des: req.body.des,
            });

            await imageUpload.save();

            res.status(200).send({ imageUpload });
        } catch (error) {
            console.log(error.message);
            res.status(400).send({ error: error.message });
        }
    });
});

router.get('/getSpecificItem/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Product.findById({ id: itemId });
        if (!item) {
            return res.status(400).send({ error: "Item Does Not Exist" });
        }
        res.status(200).send({ item });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: "Internal Error Occurred" });
    }
});

router.delete('/removeItem/:id',async (req,res)=>{
    try {
        const itemId = req.params.id;
        const item = await Product.findByIdAndDelete(itemId);
        if(!item){
            return res.status(400).send({error:'Item Not Found'});
        }
        res.status(200).send({item});
    } catch (error) {
        console.log(error.message);
        res.status(400).send({error:'Internal Error Occurred'});
    }
})


export default router;