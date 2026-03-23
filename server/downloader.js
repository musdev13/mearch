import { execSync } from 'child_process';

export async function downloadTrack(req, res) {
    const { title, artist } = req.query;

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

        res.json({ 
            success: true, 
            url: `http://localhost:4355/download/${encodeURIComponent(finalPath)}` 
        });

    } catch (error) {
        console.error("YT-DLP Error:", error.message);
        res.status(500).json({ success: false, error: "Download failed" });
    }
}