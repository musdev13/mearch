export function parseTracks(data){
    const rawList = data.tracks.items;
    const trackList = [];
    
    rawList.forEach(el => {
        const artist = el.artists.map(a => a.name).join('/');

        trackList.push({
            title: el.name,
            artist: artist,
            cover: el.album.images[1]?.url
        });
    });

    // console.log(trackList);
    return trackList;
}