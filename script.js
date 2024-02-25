window.onload = function () {


    function getAccessToken() {
        const client_id = '923e43b997874eee9d3211d89a04e949';
        const client_secret = 'c6100259864645ae805582d9993a626c';

        // Make a POST request to get the access token
        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => response.json())
            .then(data => {
                const access_token = data.access_token;
                return access_token;
            })
            .catch(error => {
                console.error('Error fetching access token:', error);
            });
    }

    const accessToken = getAccessToken();
    const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
};

    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchButton.addEventListener('click', () => {
       // const moodLabel = analyzeMood(searchInput.value);
       moodLabel="happy";
        searchSongs(moodLabel);
    });

    function searchSongs(moodLabel) {
        const query = `mood:${moodLabel} track`;

        fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
            headers: headers
        })
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data.tracks.items);
            })
            .catch(error => {
                console.error(error);
            });
    }
    let playlist = [];

    function addToPlaylist(song) {
        playlist.push(song);
        displayPlaylist();
      }
    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        for (let i = 0; i < results.length; i++) {
            const song = results[i];
            const songElement = document.createElement('li');
            songElement.textContent = song.name;
            songElement.addEventListener('click', () => {
                addToPlaylist(song);
            });
            searchResults.appendChild(songElement);
        }
    }
    function displayPlaylist() {
        const playlistElement = document.getElementById('playlist');
        playlistElement.innerHTML = '';
        for (let i = 0; i < playlist.length; i++) {
          const songElement = document.createElement('li');
          songElement.textContent = playlist[i].name;
          playlistElement.appendChild(songElement);
        }
      }
}
