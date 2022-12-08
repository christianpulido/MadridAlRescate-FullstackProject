const router = require('express').Router();
const { getAll, getById, create, update, deleteById } = require('../../models/donaciones.model');


// *************GET*************

// Me muestra todas las donaciones
router.get('/', async (req, res) => {
    try {
        const result = await getAll();
        res.json(result);
    } catch (err) {
        res.json(err.message);
    }
});


// ** Me muestra todas las donaciones por su ID
router.get('/:donacionId', async (req, res) => {
    try {
        const { donacionId } = req.params;
        const donacion = await getById(donacionId);
        res.json(donacion);
    } catch (err) {
        res.json(err);
    }
});

// *************POST*************

// ** Añadido de donaciones

router.post('/', async (req, res) => {
    try {
        const { insertId } = await create(req.body);
        const donacion = await getById(insertId);
        res.json(donacion);
    } catch (err) {
        res.json(err);
    }
});

// *************PUT*************
// ** Actualizado de las donaciones

router.put('/:donacionId', async (req, res) => {
    const { donacionId } = req.params;
    const result = await update(donacionId, req.body);
    res.json(result);
});

// *************DELETE*************
// **Borrado de donaciones

router.delete('/:donacionId', async (req, res) => {
    const { donacionId } = req.params;
    const result = await deleteById(donacionId);
    res.json(result);
});

module.exports = router;