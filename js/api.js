import { parseTracks } from './parseTracks.js';

export async function searchMusic(query) {
    if (!query?.trim()) return [];

    const url = `http://localhost:4355/api/search?query=${encodeURIComponent(query)}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('server error');

        const data = await response.json();
        return parseTracks(data); 
    } catch (error) {
        console.error("front error:", error);
        return null;
    }
}