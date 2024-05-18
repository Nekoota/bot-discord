const fetch = require('node-fetch');

module.exports = {
    async identifySong(songName) {
        // Call the song identification API (replace 'YOUR_API_KEY' with your actual API key)
        const apiKey = 'YOUR_API_KEY';
        const apiUrl = `https://api.song-identifier.com/v1.0/identify/?access_token=${apiKey}&q=${encodeURIComponent(songName)}`;
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            // Check if the API returned a match
            if (data.status === 'success' && data.result.length > 0) {
                const result = data.result[0];
                return {
                    title: result.title,
                    artist: result.artist
                };
            } else {
                return null; // Return null if no match found
            }
        } catch (error) {
            console.error('Error identifying song:', error);
            return null; // Return null in case of error
        }
    }
};
