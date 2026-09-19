import { ObjectId } from 'mongodb';
import { conectarDB } from '../common/db.js';
import { PeliculaSchema } from './pelicula.js';

const db = await conectarDB();
const peliculaCollection = db.collection("peliculas");

export async function handleInsertPeliculaRequest(req, res) {
    try {
        // Se aplica el schema con tipado correcto según la pauta
        const nuevaPelicula = PeliculaSchema(req.body);

        peliculaCollection.insertOne(nuevaPelicula)
            .then(result => {
                res.status(201).json({ mensaje: "Película agregada", id: result.insertedId });
            })
            .catch(error => {
                res.status(500).json({ error: "Error genérico al agregar película", detalle: error.message });
            });
    } catch (error) {
        res.status(400).json({ error: "Datos de película inválidos", detalle: error.message });
    }
}

export async function handleGetPeliculasRequest(req, res) {
    peliculaCollection.find({}).toArray()
        .then(peliculas => {
            res.status(200).json(peliculas);
        })
        .catch(error => {
            res.status(500).json({ error: "Error genérico al obtener películas", detalle: error.message });
        });
}

export async function handleGetPeliculaByIdRequest(req, res) {
    try {
        const id = new ObjectId(req.params.id);
        peliculaCollection.findOne({ _id: id })
            .then(pelicula => {
                if (!pelicula) {
                    return res.status(404).json({ error: "Recurso no encontrado" });
                }
                res.status(200).json(pelicula);
            })
            .catch(error => {
                res.status(500).json({ error: "Error genérico", detalle: error.message });
            });
    } catch (e) {
        res.status(400).json({ error: "Id mal formado" });
    }
}

export async function handleUpdatePeliculaByIdRequest(req, res) {
    try {
        const id = new ObjectId(req.params.id);
        const datosActualizados = req.body;
        peliculaCollection.updateOne({ _id: id }, { $set: datosActualizados })
            .then(result => {
                if (result.matchedCount === 0) {
                    return res.status(404).json({ error: "Recurso no encontrado" });
                }
                res.status(200).json({ mensaje: "Registro actualizado con éxito" });
            })
            .catch(error => {
                res.status(500).json({ error: "Error genérico", detalle: error.message });
            });
    } catch (e) {
        res.status(400).json({ error: "Id mal formado" });
    }
}

export async function handleDeletePeliculaByIdRequest(req, res) {
    try {
        const id = new ObjectId(req.params.id);
        peliculaCollection.deleteOne({ _id: id })
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.status(404).json({ error: "Recurso no encontrado" });
                }
                res.status(200).json({ mensaje: "Registro eliminado con éxito" });
            })
            .catch(error => {
                res.status(500).json({ error: "Error genérico", detalle: error.message });
            });
    } catch (e) {
        res.status(400).json({ error: "Id mal formado" });
    }
}