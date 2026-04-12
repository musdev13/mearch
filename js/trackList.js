export function showTrackList(tracks) {
    const container = document.querySelector('.trackList');
    
    if (!tracks || tracks.length === 0) {
        container.innerHTML = `<h2 id="hint">No results found 🌧</h2>`;
        return;
    }

    const html = tracks.map(track => `
        <div class="item">
            <img src="${track.cover}" alt="${track.title}" width="80" height="80">
            <div class="info">
                <h3>${track.title}</h3>
                <h4>${track.artist}</h4>
                <h5 style="display: none;">${track.cover_bigger}</h5>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}