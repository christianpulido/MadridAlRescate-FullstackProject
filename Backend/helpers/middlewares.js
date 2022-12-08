const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const { getById } = require('../models/usuarios.model');


// Función que verifica si eres administrador
const checkAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.json({ error: 'Debes ser administrador' });
    }
    next();
}


const checkToken = async (req, res, next) => {
    // 1 - Si el token viene incluido en la cabecera
    if (!req.headers['authorization']) {
        return res.json({ error: 'No has incluido la cabecera de autorización' });
    }

    // extraigo la propiedad authorization y lo guardo en una variable llamada token
    const { authorization: token } = req.headers

    // 2 - Si el token es correcto
    let obj;
    try {
        obj = jwt.verify(token, 'tralarí, tralará');
    } catch (error) {
        return res.json({ error: 'El token no tiene un formato válido' });
    }

    // 3 - Si el token está caducado
    if (dayjs().unix() > obj.expiresAt) {
        return res.json({ error: 'El token ha caducado' });
    }

    const usuario = await getById(obj.userId)
    req.user = usuario;
    next();
}


module.exports = {
    checkAdmin, checkToken
}