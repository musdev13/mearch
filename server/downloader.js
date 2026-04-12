import { execSync } from 'child_process';
import NodeID3 from 'node-id3';
import axios from 'axios';

async function updateMp3Metadata(finalPath, artist, title, coverUrl) {
    try {
        const response = await axios.get(coverUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'utf-8');

        const tags = {
            title: title,
            artist: artist,
            image: {
                mime: "image/jpeg",
                type: {
                    id: 3,
                    name: 'front cover'
                },
                description: 'Cover',
                imageBuffer: imageBuffer,
            },
        };

        const success = NodeID3.update(tags, finalPath);

        if (success) {
            console.log('Metadata Updated!');
        } else {
            console.error('Error while tags editing.');
        }
    } catch (error) {
        console.error('Error occured:', error.message);
    }
}

export async function downloadTrack(req, res) {
    const { title, artist, cover } = req.query;

    if (!title || !artist) {
        return res.status(400).json({ error: 'Missing title or artist' });
    }

    try {
        const query = `${artist} - ${title}`;
        const safeName = 'download';
        const finalPath = `${safeName}.mp3`;

        console.log(`[YouTube] Downloading: ${query}`);
        execSync(
            `yt-dlp --force-overwrites -x --audio-format mp3 --audio-quality 0 -o "${safeName}.%(ext)s" "ytsearch1:${query}"`, 
            { cwd: process.cwd(), stdio: 'ignore' }
        );

        await updateMp3Metadata(finalPath,artist,title,cover);

        res.json({ 
            success: true, 
            url: `http://localhost:4355/download/${encodeURIComponent(finalPath)}` 
        });

    } catch (error) {
        console.error("YT-DLP Error:", error.message);
        res.status(500).json({ success: false, error: "Download failed" });
    }
}