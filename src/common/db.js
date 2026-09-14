import { MongoClient } from 'mongodb';

const uri = "mongodb://mendozapadilla_db_user:juanfe001@ac-yrbkcrs-shard-00-00.452cibe.mongodb.net:27017,ac-yrbkcrs-shard-00-01.452cibe.mongodb.net:27017,ac-yrbkcrs-shard-00-02.452cibe.mongodb.net:27017/?ssl=true&replicaSet=atlas-b7wn8v-shard-0&authSource=admin&appName=eva-u3-express";
const client = new MongoClient(uri);

export async function conectarDB() {
    try {
        await client.connect();
        console.log("Conexión exitosa a MongoDB Atlas");
        return client.db("cine-db");
    } catch (error) {
        console.error("Error al conectar a MongoDB Atlas:", error);
        throw error;
    }
}