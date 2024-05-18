module.exports = {
    name: 'skip',
    description: 'Skip the currently playing song',
    execute(message, args) {
        // cek jika bot di voice channel
        const voiceChannel = message.guild.me.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('I\'m not currently in a voice channel.');
        }

        // cek jika bot berada di voice channel yang dengan user
        const userVoiceChannel = message.member.voice.channel;
        if (!userVoiceChannel || userVoiceChannel.id !== voiceChannel.id) {
            return message.channel.send('You need to be in the same voice channel as me to use this command.');
        }

        // cek jika disana dispatcher
        const dispatcher = message.client.dispatcher;
        if (!dispatcher) {
            return message.channel.send('There is no music playing to skip.');
        }

        // skip lagu yang sedang di play
        dispatcher.end();
        return message.channel.send('Skipping the currently playing song.');
    },
};
