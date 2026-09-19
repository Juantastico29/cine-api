import { ObjectId } from 'mongodb';

export const PeliculaSchema = (data = {}) => {
  return {
    _id: data._id ? new ObjectId(data._id) : new ObjectId(),
    nombre: String(data.nombre || '').trim(),
    generos: Array.isArray(data.generos) 
      ? data.generos 
      : (Array.isArray(data.géneros) ? data.géneros : []),
    anioEstreno: parseInt(data.anioEstreno, 10)
  };
};