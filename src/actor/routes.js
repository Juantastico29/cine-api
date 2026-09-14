import { Router } from 'express';
import {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
} from './actor.controller.js';

export const ActorRoutes = Router();

ActorRoutes.post("/actor", handleInsertActorRequest);
ActorRoutes.get("/actores", handleGetActoresRequest);
ActorRoutes.get("/actor/:id", handleGetActorByIdRequest);
ActorRoutes.get("/actor/:pelicula", handleGetActoresByPeliculaIdRequest);