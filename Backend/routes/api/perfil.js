const router = require('express').Router();
const { getAll, getById, create, update, deleteById } = require('../../models/perfil.model')


// *************GET*************
// Me muestra todas las personas

router.get('/', async (req, res) => {
    try {
        const result = await getAll();
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});


// ** Me muestra todas las personas por su ID
router.get('/:personaId', async (req, res) => {
    try {
        const { personaId } = req.params;
        const persona = await getById(personaId);
        res.json(persona);
    } catch (err) {
        res.json(err);
    }
});

// *************POST*************

// ** Añadido de personas

router.post('/', async (req, res) => {
    try {
        const { insertId } = await create(req.body);
        const persona = await getById(insertId);
        res.json(persona);
    } catch (err) {
        res.json(err);
    }
});

// *************PUT*************
// ** Actualizado de las personas

router.put('/:personaId', async (req, res) => {
    const { personaId } = req.params;
    const result = await update(personaId, req.body);
    res.json(result);
});

// *************DELTE*************
// **Borrado de las personas
router.delete('/:personaId', async (req, res) => {
    const { personaId } = req.params;
    const result = await deleteById(personaId);
    res.json(result);
});





module.exports = router;