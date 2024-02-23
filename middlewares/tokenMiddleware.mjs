import jwt from 'jsonwebtoken';
import 'dotenv/config';
import nodemailer from 'nodemailer'

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

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
      user:  process.env.USER,
      pass:  process.env.PASS,
    },
  });

export { setToken, setRole, transporter };