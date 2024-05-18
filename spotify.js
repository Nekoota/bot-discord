module.exports = {
    extractPlaylistId(playlistUrl) {
        // Regular expression to match Spotify playlist URLs
        const spotifyPlaylistRegex = /^https:\/\/open\.spotify\.com\/playlist\/([\w\d]+)(\?si=[\w\d]+)?$/;
        
        // Check if the URL matches the regular expression
        const match = playlistUrl.match(spotifyPlaylistRegex);
        if (match && match[1]) {
            return match[1]; // Return the playlist ID
        } else {
            return null; // Return null if the URL is invalid
        }
    }
};
