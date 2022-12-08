const { executeQuery, executeQueryOne } = require('../helpers/utils');

// **MOSTRAR TODOS
const getAll = () => {
    return executeQuery('select * from usuario');
}

const create = ({ nombre, apellido, email, password, isAdmin, isActive }) => {
    return executeQuery('insert into usuario (nombre, apellido, email, password, isAdmin, isActive) values (?,?,?,?,?,?)', [nombre, apellido, email, password, isAdmin, isActive]);
}

const update = (usuarioId, { nombre, apellido, isAdmin, isActive }) => {
    return executeQuery('UPDATE usuario SET nombre = ?, apellido = ?, isAdmin = ?, isActive = ? WHERE id_user = ?', [nombre, apellido, isAdmin, isActive, usuarioId])
}

const changePassword = (usuarioId, { password }) => {
    return executeQuery('UPDATE usuario SET password = ? WHERE id_user = ?', [password, usuarioId])
}

const getById = (usuarioId) => {
    return executeQueryOne('select * from usuario where id_user = ?', [usuarioId]);

}
const getByEmail = (email) => {
    return executeQueryOne('select * from usuario where email = ?', [email])
}

module.exports = {
    create, update, getById, getByEmail, getAll, changePassword
}