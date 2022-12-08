const router = require('express').Router()

const { create, update, getByEmail, getAll, getById, changePassword } = require('../../models/usuarios.model');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { createToken, sendMail, tokenToResetPassword } = require('../../helpers/utils');
const { checkToken, checkAdmin } = require('../../helpers/middlewares');


// Me muestra todos los usuarios
router.get('/', checkToken, checkAdmin, async (req, res) => {
    try {
        const result = await getAll();
        res.json(result);

    } catch (err) {
        res.json(err.message);
    }
})


router.get('/profile', checkToken, (req, res) => {
    res.json(req.user);
});


// Reseteo de contraseña 
router.get('/reset-password/:userEmail', async (req, res) => {
    const { userEmail } = req.params;
    const userExist = await getByEmail(userEmail);
    if (userExist) {
        let token = tokenToResetPassword(userExist);
        let link = 'http://localhost:4200/recuperar-contraseña/' + token;

        sendMail(
            userEmail,
            'Solicitud para restablecer contraseña',
            `Haz click en el siguiente enlace para restablecer tu contraseña. Si no has solicitado una nueva contraseña, ignora este correo. \n${link}\n\n Y recuerda, este enlace es válido por 15 minutos`
        )

        res.json({ 'success': 'Enlace enviado' })

    } else {
        res.json({ 'error': 'Usuario no existente' })
    }
});


// Me muestra todos los usuarios por su ID
router.get('/:userId', checkToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await getById(userId);
        res.json(user);
    } catch (err) {
        res.json(err);
    }
});


// Funcion LOGOUT que me redirige al login
router.get('/logout', (req, res) => {
    req.logout();
    return res.redirect('/login')
})


//VALIDACIONES en Registro 
router.post('/register',
    body('nombre')
        .isLength({ min: 3, max: 30 })
        .withMessage('El nombre debe tener entre 3 y 30 caracteres'),

    body('apellido')
        .isLength({ min: 5, max: 50 })
        .withMessage('El apellido debe tener entre 5 y 50 caracteres'),

    body('email')
        .custom((value) => {
            const regExpMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
            return regExpMail.test(value);
        })
        .withMessage('Email no válido'),

    body('password')
        .custom((value) => {
            const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/;
            return regExp.test(value);
        })
        .withMessage('La contraseña debe tener de 4 a 12 caracteres, mayúsculas, minúsculas y números'),

    body('repeatPassword')
        .custom((value) => {
            const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/;
            return regExp.test(value);
        })
        .withMessage('Debes repetir la contraseña'),

    body('isAdmin')
        .custom((value) => {
            const regExpAdmin = /^[0-1]$/;
            return regExpAdmin.test(value);
        })
        .withMessage('1 = Activo  0 = Inactivo'),

    async (req, res) => {
        // Comprobamos si hay errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json(errors.array());
            return res.status(400).json(errors.array());
        }

        // Comprobamos si el email está registrado
        const userExist = await getByEmail(req.body.email);
        if (userExist) {
            res.json({ 'error': 'Ya hay un usuario registrado con este email' })
        } else {
            // Antes de la inserción encriptamos la contraseña
            req.body.password = bcrypt.hashSync(req.body.password, 11);

            const result = await create(req.body);
            res.json(result);
        }
    });

// *************PUT*************

// Editar info usuario (VALIDACIONES)
router.put('/editar/:usuarioId', checkToken, checkAdmin,
    body('nombre')
        .isLength({ min: 3, max: 30 })
        .withMessage('El nombre debe tener entre 3 y 30 caracteres'),

    body('apellido')
        .isLength({ min: 5, max: 50 })
        .withMessage('El apellido debe tener entre 5 y 50 caracteres'),

    body('isAdmin')
        .custom((value) => {
            const regExpAdmin = /^[0-1]$/;
            return regExpAdmin.test(value);
        })
        .withMessage('1 = Activo  0 = Inactivo'),

    body('isActive')
        .custom((value) => {
            const regExpActive = /^[0-1]$/;
            return regExpActive.test(value);
        })
        .withMessage('1 = Activo  0 = Inactivo')

    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        const { usuarioId } = req.params;
        const result = await update(usuarioId, req.body);
        res.json(result);
    });


// VALIDACIONES nueva contraseña

router.put('/new-password/:usuarioId', checkToken,
    body('password')
        .custom((value) => {
            const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/;
            return regExp.test(value);
        })
        .withMessage('La contraseña debe tener de 4 a 12 caracteres, mayúsculas, minúsculas y números'),

    body('confirmPassword')
        .custom((value) => {
            const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/;
            return regExp.test(value);
        })
        .withMessage('Debes repetir la contraseña'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        req.body.password = bcrypt.hashSync(req.body.password, 11);
        const { usuarioId } = req.params;
        const result = await changePassword(usuarioId, req.body);
        res.json(result);
    }
);

// *************POST*************
//** */ VALIDACIONES Login

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const usuario = await getByEmail(email);

    if (!usuario) {
        return res.json({ error: 'Error en usuario y/o contraseña' });
    }

    const iguales = bcrypt.compareSync(password, usuario.password);
    if (!iguales) {
        return res.json({ error: 'Error en usuario y/o contraseña' });
    }

    const isActive = usuario.isActive === 1 ? true : false;
    if (!isActive) {
        return res.json({ error: 'Usuario desactivado' });
    }

    res.json({
        success: 'Login correcto',
        token: createToken(usuario)
    });
});



module.exports = router;






