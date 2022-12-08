const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');


const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}


const executeQueryOne = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) return reject(err);
            if (result.length === 0) resolve(null);
            resolve(result[0]);
        });
    });
}


// ***TOKEN 
const createToken = (usuario) => {
    // Datos a guardar dentro del JWT
    const obj = {
        userId: usuario.id_user,
        userAdmin: usuario.isAdmin,
        expiresAt: dayjs().add(5, 'hours').unix()
    }
    return jwt.sign(obj, 'tralarí, tralará');
}


// ***Token reset password (token)
const tokenToResetPassword = (usuario) => {
    const obj = {
        userId: usuario.id_user,
        expiresAt: dayjs().add(15, 'minutes').unix()
    }
    return jwt.sign(obj, 'tralarí, tralará');
}


// ***ENVÍO EMAIL
const sendMail = (to, subject, message, callback) => {
    let config = nodeMailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    const opciones = {
        from: process.env.EMAIL_USER,
        subject,
        to,
        text: message
    };

    config.sendMail(opciones, callback)
}


module.exports = {
    executeQuery, executeQueryOne, createToken, sendMail, tokenToResetPassword
}