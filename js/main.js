import { searchMusic } from './api.js';
import { showTrackList } from './trackList.js';
import { downloadMP3, downloadTrack } from './downloader.js';

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchButton = searchForm.querySelector('button');
const trackListContainer = document.querySelector('.trackList');
const hint = document.getElementById('hint');


searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    searchInput.disabled = true;
    searchButton.disabled = true;
    trackListContainer.style.display = 'flex';
    trackListContainer.innerHTML = `<h2 id="hint">Searching for "${query}"...</h2>`;

    const tracks = await searchMusic(query);

    if (tracks === null) {
        trackListContainer.innerHTML = `<h2 id="hint" style="color: red;">Error connection</h2>`;
    } else {
        showTrackList(tracks);
    }

    searchInput.disabled = false;
    searchButton.disabled = false;
});

trackListContainer.addEventListener('click', async (event) => {
    const item = event.target.closest('.item');
    if (item) {
        trackListContainer.style.display = 'none';
        hint.style.display = 'block';
        const title = item.querySelector('h3').innerHTML;
        const artist = item.querySelector('h4').innerHTML;
        hint.innerHTML = `downloading ${title} - ${artist}`;
        const fileUrl = await downloadTrack(title, artist);
        console.log(fileUrl);
        downloadMP3(fileUrl, `${title} - ${artist}.mp3`)
        hint.style.display = 'none';
    }
});