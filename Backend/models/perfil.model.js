const { executeQuery, executeQueryOne } = require('../helpers/utils');

// **MOSTRAR TODOS
const getAll = () => {
    return executeQuery('select * from persona');
}

const getById = (personaId) => {
    return executeQueryOne('select * from persona where id_persona = ?', [personaId]);
}


const create = ({ nombre, apellido, edad, dni, telefono, email, direccion, mascota, tipoInmueble, descripcion, isActive, status }) => {
    return executeQuery('insert into persona ( nombre, apellido, edad, dni, telefono, email, direccion, mascota, tipoInmueble, descripcion, isActive, status) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )', [nombre, apellido, edad, dni, telefono, email, direccion, mascota, tipoInmueble, descripcion, isActive, status]);
}

const update = (personaId, { nombre, apellido, edad, dni, telefono, email, direccion, mascota, tipoInmueble, descripcion, isActive, status }) => {
    return executeQuery('UPDATE persona SET nombre = ?, apellido = ?, edad= ?, dni = ?, telefono = ?, email = ?, direccion = ?, mascota = ?, tipoInmueble = ?, descripcion = ?, isActive = ?, status = ? WHERE id_persona = ?', [nombre, apellido, edad, dni, telefono, email, direccion, mascota, tipoInmueble, descripcion, isActive, status, personaId]);
}

const deleteById = (personaId) => {
    return executeQuery('delete from persona where id_persona = ?', [personaId]);
}




module.exports = {
    getAll, getById, create, update, deleteById
}