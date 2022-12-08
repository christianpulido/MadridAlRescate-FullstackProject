const { executeQuery, executeQueryOne } = require('../helpers/utils');

// **MOSTRAR TODOS
const getAll = () => {
    return executeQuery('select * from donaciones');
}

// Mostrar donaciones por Id
const getById = (donacionId) => {
    return executeQueryOne('select * from donaciones where id_donaciones = ?', [donacionId]);
}

// Crear una donación
const create = ({ nombre, cantidad, fecha, metodoPago, isTeaming }) => {
    return executeQuery('insert into donaciones (nombre, cantidad, fecha, metodoPago, isTeaming) values (?, ?, ?, ?, ? )', [nombre, cantidad, fecha, metodoPago, isTeaming]);
}

// Actualiza donaciones
const update = (donacionId, { nombre, cantidad, fecha, metodoPago, isTeaming }) => {
    return executeQuery('UPDATE donaciones SET nombre = ?, cantidad = ?, fecha = ?, metodoPago = ?, isTeaming = ? WHERE id_donaciones = ?', [nombre, cantidad, fecha, metodoPago, isTeaming, donacionId]);
}

// Borra las donaciones
const deleteById = (donacionId) => {
    return executeQuery('delete from donaciones where id_donaciones = ?', [donacionId]);
}

module.exports = {
    getAll, getById, create, update, deleteById
}