export async function downloadTrack(title, artist) {
    const SERVER_URL = 'http://localhost:4355';
    
    const params = new URLSearchParams({ title, artist });

    try {
        const response = await fetch(`${SERVER_URL}/api/getTrack?${params.toString()}`);
        const data = await response.json();
        
        if (data.success) return data.url;
        throw new Error(data.error);
    } catch (error) {
        console.error("Download failed:", error.message);
        return null;
    }
}

export async function downloadMP3(url, filename = "track.mp3") {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
}