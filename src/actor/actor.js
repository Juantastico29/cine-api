import { ObjectId } from 'mongodb';

export const ActorSchema = (data = {}) => {
  return {
    _id: data._id ? new ObjectId(data._id) : new ObjectId(),
    idPelicula: String(data.idPelicula || ''),
    nombre: String(data.nombre || '').trim(),
    edad: parseInt(data.edad, 10),
    estaRetirado: Boolean(data.estaRetirado),
    premios: Array.isArray(data.premios) ? data.premios : []
  };
};