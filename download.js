const ytdl = require('ytdl-core');
const fs = require('fs');

module.exports = {
    name: 'download',
    description: 'Download a song from YouTube',
    async execute(message, args) {
        // cek jika pengguna menggunakan url youtube
        const url = args[0];
        if (!url || !ytdl.validateURL(url)) {
            return message.channel.send('Please provide a valid YouTube URL.');
        }

        // download audio stream untuk youtube
        const stream = ytdl(url, { filter: 'audioonly' });

        // buat tulisan stream untuk save audio stream ke file
        const filePath = `./downloads/${Date.now()}.mp3`;
        const writeStream = fs.createWriteStream(filePath);

        // pipe audio stream
        stream.pipe(writeStream);

        // beritahu finish jika download sudah selesai
        writeStream.on('finish', () => {
            message.channel.send(`Song downloaded successfully: ${filePath}`);
        });

        // beritahu error pada event ketika mendownload
        writeStream.on('error', (error) => {
            console.error('Error downloading song:', error);
            message.channel.send('An error occurred while downloading the song.');
        });
    },
};
