module.exports = {
    name: 'pause',
    description: 'Pause the music playback',
    execute(message, args) {
        // cek jika bot sudah di voice channel
        const voiceChannel = message.guild.me.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('I\'m not currently in a voice channel.');
        }

        // cek jika user sudah di voicechannel yag sama dengan bot
        const userVoiceChannel = message.member.voice.channel;
        if (!userVoiceChannel || userVoiceChannel.id !== voiceChannel.id) {
            return message.channel.send('You need to be in the same voice channel as me to pause the music.');
        }

        // cek jika disana ada dispatcher (music playing)
        const dispatcher = message.client.dispatcher;
        if (!dispatcher) {
            return message.channel.send('There is no music playing to pause.');
        }

        // pause playback musik
        if (!dispatcher.paused) {
            dispatcher.pause();
            return message.channel.send('Music playback paused.');
        } else {
            return message.channel.send('Music is already paused.');
        }
    },
};
