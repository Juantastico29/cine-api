import { ObjectId } from 'mongodb';

export const PeliculaSchema = {
    _id: ObjectId,
    nombre: "string",
    géneros: "array",
    anioEstreno: "int"
};