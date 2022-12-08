const router = require('express').Router();
const express = require('express');


const { checkAdmin, checkToken } = require('../helpers/middlewares');
const apiAnimalsRouter = require('./api/animals');
const apiDonacionesRouter = require('./api/donaciones');
const apiPerfilRouter = require('./api/perfil');
const apiUsuariosRouter = require('./api/usuarios');




router.use('/animals', apiAnimalsRouter);
router.use('/donaciones', checkToken, checkAdmin, apiDonacionesRouter);
router.use('/perfil', checkToken, checkAdmin, apiPerfilRouter);
router.use('/usuarios', apiUsuariosRouter);



module.exports = router;