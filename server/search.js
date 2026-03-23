import axios from 'axios';
export async function searchMusic(req, res) {
    try {
        const { query } = req.query;
        const targetUrl = `https://dubolt.com/api/search/?query=${encodeURIComponent(query)}&type=track&limit=20`;
        
        console.log(`request: ${query}`);
        
        const response = await axios.get(targetUrl, {
            headers: { 'Accept': 'application/json' }
        });

        res.json(response.data);
    } catch (error) {
        console.error('err:', error.message);
        res.status(500).json({ error: 'error in music search' });
    }
}