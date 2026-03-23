import express from 'express';
import cors from 'cors';
import { searchMusic } from './search.js';
import { downloadTrack } from './downloader.js';

const app = express();
const PORT = 4355;

app.use(cors());
app.use(express.json());

app.use('/download', express.static(process.cwd()));

app.get('/api/search', (req, res) => searchMusic(req, res));
app.get('/api/getTrack', (req, res) => downloadTrack(req, res));

app.listen(PORT, () => {
    console.log(`🚀 server is running on http://localhost:${PORT}`);
});