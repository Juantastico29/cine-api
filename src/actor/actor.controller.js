import { ObjectId } from 'mongodb';
import { conectarDB } from '../common/db.js';
import { ActorSchema } from './actor.js';

const db = await conectarDB();
const actorCollection = db.collection("actores");
const peliculaCollection = db.collection("peliculas");

export async function handleInsertActorRequest(req, res) {
    // Se toma el nombre de la película enviado en el body (o en idPelicula si mandan el nombre ahí)
    const nombreBuscado = req.body.nombrePelicula || req.body.idPelicula;

    peliculaCollection.findOne({ nombre: nombreBuscado })
        .then(peliculaEncontrada => {
            if (!peliculaEncontrada) {
                return res.status(404).json({ error: "La película especificada no existe en la colección" });
            }

            // Se construye el actor con el schema y se le asigna el _id real de la película encontrada
            const actorTipado = ActorSchema({
                ...req.body,
                idPelicula: peliculaEncontrada._id.toString()
            });

            return actorCollection.insertOne(actorTipado);
        })
        .then(result => {
            if (result && !res.headersSent) {
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

export async function handleGetActorByIdRequest(req, res) {
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