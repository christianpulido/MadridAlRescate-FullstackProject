export interface Animal {
    id_animal?: number,
    nombre: string,
    edad: number,
    tipo: string,
    raza: string,
    tamaño: string,
    sexo: string,
    salud: string,
    descripcion: string,
    urgencia: string,
    fechaEntrada: string | any,
    fechaEntrega?: string | any,
    status: string,
    imagenes: string[];
    isActive: number,
    id_persona?: number
}
