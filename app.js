const songContainer = document.getElementById('song-container');

// Use async await instead of .then
async function searchSong() {
    const searchKey = document.getElementById('search-key').value.trim();
    //console.log(searchKey);

    //Load data
    const res = await fetch(`https://api.lyrics.ovh/suggest/${searchKey}`)
    const data = await res.json()
    displaySongs(data.data)
};

const displaySongs = songs => {
    songContainer.innerHTML = '';
    songs.forEach(song => {
        //console.log(song.artist.name);
        const div = document.createElement('div');
        div.className = 'single-result row align-items-center my-3 p-3';
        const songInfo = `
                <div class="col-md-9">
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    <audio controls>
                        <source src="${song.preview}" type="audio/ogg">                     
                    </audio>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                </div>
        `;
        div.innerHTML = songInfo;
        songContainer.appendChild(div);



    });
};

async function getLyrics(artist, title){
    //console.log(artist, title);
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await res.json();
    displayLyrics(data.lyrics);
}

const displayLyrics = lyrics => {
     const songLyrics = document.getElementById('song-lyrics');
     songLyrics.innerText = lyrics;
};