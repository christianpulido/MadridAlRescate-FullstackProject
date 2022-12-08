export interface Donation {
    id_donaciones: number,
    nombre: string,
    cantidad: number,
    fecha: Date | any,
    metodoPago: string,
    isTeaming: string
}
