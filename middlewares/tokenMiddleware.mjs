import jwt from 'jsonwebtoken';
import 'dotenv/config';

const setToken = (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if(token){
            req.app.locals.token = req.cookies.jwt;
        }else{
            req.app.locals.token = ''
        }
    } catch (err) {
        console.log(err);
    }
    next();
};

const setRole = (req, res, next) => {
    try{
        const token = req.cookies.jwt
        if(token){
            const userJWT = jwt.verify(token, process.env.SECRET);
            req.app.locals.role = userJWT.role
        }else{
            req.app.locals.role = 'USER'
        }
    }catch(err){
        console.log(err)
    }
    next()
}

export { setToken, setRole };