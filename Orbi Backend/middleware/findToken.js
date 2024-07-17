import jwt from 'jsonwebtoken';

const findToken = async (req, res, next) => {
    try {
        
        const token = req.header('Auth-Token') || req.header('auth-token');
        
        if (!token) {
            return res.status(400).send({ error: 'Internal Error Occurred' });
        }
        
        const secrete = 'VivekIsCollegeStudent'; 

        const decodedJwt = jwt.decode(token, secrete);
        
        req.user = decodedJwt.userId.id;
        
        next();
    
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal Error Occurred' });
    }
}

export default findToken;