import express from 'express';
import cors from 'cors';
import { conectarDB } from './src/common/db.js';
import { peliculaRoutes } from './src/pelicula/routes.js';
import { ActorRoutes } from './src/actor/routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de middlewares necesarios incluyendo cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta por defecto que solo debe ser ejecutada por método GET
app.get('/', (req, res) => {
    res.status(200).send("Bienvenido al cine Iplacex");
});

// Levantar servidor de Express solo si la conexión a Atlas ha sido generada correctamente
conectarDB()
    .then(() => {
        console.log("Conexión exitosa al clúster de Atlas.");

        // Configuración de rutas personalizadas como middleware con prefijo /api
        app.use('/api', peliculaRoutes);
        app.use('/api', ActorRoutes);

        app.listen(PORT, () => {
            console.log(`Servidor de Express ejecutándose en el puerto ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error al conectar a Atlas. El servidor no se pudo iniciar.", error);
    });