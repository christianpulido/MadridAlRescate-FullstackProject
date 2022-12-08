const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const fs = require('fs');

const { checkToken } = require('../../helpers/middlewares');
const { sendMail } = require('../../helpers/utils');
const { getAll, getAllActives, getById, create, update, deleteImages, deleteEntity } = require('../../models/animals.model');



// *************GET*************
// Muestra todos los animales
router.get('/', async (req, res) => {
    try {
        const result = await getAll();
        res.json(result);

    } catch (err) {
        res.json(err.message);
    }
});

// Muestra todos los animales activos
router.get('/actives', async (req, res) => {
    try {
        const result = await getAllActives();
        res.json(result);

    } catch (err) {
        res.json(err.message);
    }
});


//  Muestra todos los animales por Id
router.get('/:animalId', async (req, res) => {
    try {
        const { animalId } = req.params;
        const animal = await getById(animalId);
        res.json(animal);

    } catch (err) {
        res.json(err);
    }
});

// *************POST*************

// **Añade las fotos de los animales

router.post('/', checkToken, upload.array("imagenes"), async (req, res) => {
    let imagenes = [];

    req.files.forEach((imagen) => {
        const extension = '.' + imagen.mimetype.split('/')[1];
        const newName = imagen.filename + extension;
        const newPath = imagen.path + extension;
        fs.renameSync(imagen.path, newPath);
        imagenes.push(newName);
    })

    req.body.imagenes = `["${imagenes[0]}", "${imagenes[1]}", "${imagenes[2]}", "${imagenes[3]}"]`;

    try {
        const { insertId } = await create(req.body);
        const animal = await getById(insertId);
        res.json(animal);
    } catch (err) {
        res.json(err);
    }
});

// **Manda email sobre la información del animal(tarjeta de contacto)
router.post('/info', (req, res) => {

    const mensaje = `${req.body.mensaje}\n nombre:${req.body.nombre}\n telefono:${req.body.telefono}\n email:${req.body.email}`
    let email = process.env.EMAIL_USER;
    sendMail(email, req.body.asunto, mensaje, (error, resultado) => {
        if (error) res.json(error);
        res.json({ 'success': 'Su mensaje ha sido enviado' })
    });

});

// *************PUT*************

// **Borra imagenes del animal
router.put('/images/:animalId', checkToken, async (req, res) => {
    const { animalId } = req.params;
    const result = await deleteImages(animalId);
    res.json(result);
});

// **Borra id_persona
router.put('/entity/:animalId', checkToken, async (req, res) => {
    const { animalId } = req.params;
    const result = await deleteEntity(animalId);
    res.json(result);
});


// ** Modifica datos de un animal en una BD
router.put('/:animalId', checkToken, upload.array("imagenes"), async (req, res) => {
    let imagenes = [];

    req.files.forEach((imagen) => {
        const extension = '.' + imagen.mimetype.split('/')[1];
        const newName = imagen.filename + extension;
        const newPath = imagen.path + extension;
        fs.renameSync(imagen.path, newPath);
        imagenes.push(newName);
    })

    const { animalId } = req.params;

    if (imagenes.length > 0) {
        req.body.imagenes = `["${imagenes[0]}", "${imagenes[1]}", "${imagenes[2]}", "${imagenes[3]}"]`;
    }

    try {
        const result = await update(animalId, req.body);
        res.json(result);

    } catch {
        res.json(result);
    }
});

// *************DELETE*************

// router.delete('/:animalId', async (req, res) => {
//     const { animalId } = req.params;
//     const result = await deleteById(animalId);
//     res.json(result);
// });

module.exports = router;