import express from 'express';
import router from './routes/router.js';
import path from 'path';

const app = express();

app.use(express.json());

app.use(router);


import { fileURLToPath } from 'url';

// Emular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.resolve('src/uploads')));

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../test/index.html'); // Caminho absoluto
    res.sendFile(filePath);
});
app.get('/p', (req, res) => {
    const filePath = path.join(__dirname, '../test/post.html'); // Caminho absoluto
    res.sendFile(filePath);
});

export default app;

