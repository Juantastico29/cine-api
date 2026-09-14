import { ObjectId } from 'mongodb';
import { conectarDB } from '../common/db.js';

const db = await conectarDB();
const actorCollection = db.collection("actores");
const peliculaCollection = db.collection("peliculas");

export async function handleInsertActorRequest(req, res) {
    const nuevoActor = req.body;
    
    peliculaCollection.findOne({ nombre: nuevoActor.idPelicula })
        .then(peliculaEncontrada => {
            if (!peliculaEncontrada) {
                return res.status(404).json({ error: "La película especificada no existe en la colección" });
            }
            return actorCollection.insertOne(nuevoActor);
        })
        .then(result => {
            if (!res.headersSent) {
                res.status(201).json({ mensaje: "Actor agregado con éxito", id: result.insertedId });
            }
        })
        .catch(error => {
            if (!res.headersSent) {
                res.status(500).json({ error: "Error genérico al agregar actor", detalle: error.message });
            }
        });
}

export async function handleGetActoresRequest(req, res) {
    actorCollection.find({}).toArray()
        .then(actores => {
            res.status(200).json(actores);
        })
        .catch(error => {
            res.status(500).json({ error: "Error genérico", detalle: error.message });
        });
}

export async function handleGetActorByIdRequest(req, res, next) {
    if (!ObjectId.isValid(req.params.id)) {
        return next();
    }
    try {
        const id = new ObjectId(req.params.id);
        actorCollection.findOne({ _id: id })
            .then(actor => {
                if (!actor) {
                    return res.status(404).json({ error: "Recurso no encontrado" });
                }
                res.status(200).json(actor);
            })
            .catch(error => {
                res.status(500).json({ error: "Error genérico", detalle: error.message });
            });
    } catch (e) {
        res.status(400).json({ error: "Id mal formado" });
    }
}

export async function handleGetActoresByPeliculaIdRequest(req, res) {
    const peliculaId = req.params.pelicula;
    actorCollection.find({ idPelicula: peliculaId }).toArray()
        .then(actores => {
            res.status(200).json(actores);
        })
        .catch(error => {
            res.status(500).json({ error: "Error genérico", detalle: error.message });
        });
}