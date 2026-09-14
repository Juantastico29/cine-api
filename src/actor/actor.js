import { ObjectId } from 'mongodb';

export const ActorSchema = {
    _id: ObjectId,
    idPelicula: "string",
    nombre: "string",
    edad: "int",
    estaRetirado: "bool",
    premios: "array"
};