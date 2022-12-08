const { executeQuery, executeQueryOne } = require('../helpers/utils');

// **MOSTRAR TODOS

const getAllActives = () => {
    return executeQuery('select * from animal WHERE isActive = 1');
}

const getAll = () => {
    return executeQuery('select * from animal');
}

// **MOSTRAR POR ID
const getById = (animalId) => {
    return executeQueryOne('select * from animal where id_animal = ?', [animalId]);
}


// **CREAR ANIMALES
const create = ({ nombre, edad, tipo, raza, tamano, sexo, salud, descripcion, urgencia, fechaEntrada, fechaEntrega, status, isActive, id_persona, imagenes }) => {
    return executeQuery('insert into animal (nombre, edad, tipo, raza, tamaño, sexo, salud, descripcion, urgencia, fechaEntrada, fechaEntrega, status, isActive, id_persona, imagenes) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, edad, tipo, raza, tamano, sexo, salud, descripcion, urgencia, fechaEntrada, fechaEntrega, status, isActive, id_persona, `${imagenes}`]);
}

// **ACTUALIZAR ANIMALES
const update = (animalId, { nombre, edad, tipo, raza, tamano, sexo, salud, descripcion, urgencia, fechaEntrada, fechaEntrega, status, isActive, imagenes, id_persona }) => {
    if(imagenes) {
        return executeQuery('UPDATE animal SET nombre = ?, edad = ?, tipo= ?, raza = ?, tamaño = ?, sexo = ?, salud = ?, descripcion = ?, urgencia = ?, fechaEntrada = ?, fechaEntrega = ?, status = ?, isActive = ?, imagenes = ?, id_persona = ? WHERE id_animal = ?', [nombre, edad, tipo, raza, tamano, sexo, salud, descripcion, urgencia, fechaEntrada, fechaEntrega, status, isActive, imagenes, id_persona, animalId]);

    } else {
        return executeQuery('UPDATE animal SET nombre = ?, edad = ?, tipo= ?, raza = ?, tamaño = ?, sexo = ?, salud = ?, descripcion = ?, urgencia = ?, fechaEntrada = ?, fechaEntrega = ?, status = ?, isActive = ?, id_persona = ? WHERE id_animal = ?', [nombre, edad, tipo, raza, tamano, sexo, salud, descripcion, urgencia, fechaEntrada, fechaEntrega, status, isActive, id_persona, animalId]);
    }
    
}
// ** BORRA IMAGENES DE ANIMALES
const deleteImages = (animalId) => {
    return executeQuery('UPDATE animal SET imagenes = NULL WHERE id_animal = ?', [animalId]);
}

// ** BORRA ID PERSONA
const deleteEntity = (animalId) => {
    return executeQuery('UPDATE animal SET id_persona = NULL WHERE id_animal = ?', [animalId]);
}

// **BORRAR ANIMALES
const deleteById = (animalId) => {
    return executeQuery('delete from animal where id_animal = ?', [animalId]);
}



module.exports = {
    getAll, getAllActives, getById, create, update, deleteById, deleteImages, deleteEntity
}