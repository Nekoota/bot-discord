const fetch = require('node-fetch');

module.exports = {
    name: 'identify',
    description: 'Identify a song',
    async execute(message, args) {
        // cek jika user provided nama lagu
        const songName = args.join(' ');
        if (!songName) {
            return message.channel.send('Please provide the name of the song you want to identify.');
        }

        // panggil acrcloud API untuk identifikasi musik
        try {
            const response = await fetch(`https://api.acrcloud.com/v1/identify/?title=${encodeURIComponent(songName)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Your Discord Bot Name',
                    'Authorization': 'Bearer YOUR_ACRCLOUD_API_KEY'
                }
            });
            const data = await response.json();

            // cek jika api cocok
            if (data.status.code === 0 && data.metadata.music.length > 0) {
                const song = data.metadata.music[0];
                const artist = song.artists.map(artist => artist.name).join(', ');
                const title = song.title;
                message.channel.send(`The song "${title}" by ${artist} was identified.`);
            } else {
                message.channel.send('Sorry, I couldn\'t identify the song.');
            }
        } catch (error) {
            console.error('Error identifying song:', error);
            message.channel.send('An error occurred while identifying the song.');
        }
    },
};
