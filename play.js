const { VoiceChannel, StreamDispatcher } = require('discord.js');
const ytdl = require('ytdl-core');
const { validateYouTubeUrl } = require('../utils/youtube');

module.exports = {
    name: 'play',
    description: 'Play a song from YouTube',
    async execute(message, args) {
        // check jika user sudah di voice channel
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to play music!');
        }

        // join ke voice channel yang sama dgn user
        const connection = await voiceChannel.join();

        // validasi kr youtube url
        const url = args[0];
        if (!validateYouTubeUrl(url)) {
            return message.channel.send('Invalid YouTube URL!');
        }

        // fetch song info to get duration
        const info = await ytdl.getInfo(url);
        const durationSeconds = parseInt(info.videoDetails.lengthSeconds);
        const durationFormatted = formatDuration(durationSeconds);

        // putar lagu di voice chaannel
        const stream = ytdl(url, { filter: 'audioonly' });
        const dispatcher = connection.play(stream);

        dispatcher.on('start', () => {
            message.channel.send(`Now playing: ${info.videoDetails.title} (${durationFormatted})`);
        });

        dispatcher.on('finish', () => {
            voiceChannel.leave();
        });

        dispatcher.on('error', (err) => {
            console.error(err);
            voiceChannel.leave();
        });

        // function format durasi ke HH:MM:SS
        function formatDuration(seconds) {
            const hrs = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            return `${hrs > 0 ? hrs + ':' : ''}${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
    },
};
