module.exports = {
    name: 'leave',
    description: 'Leave the voice channel',
    execute(message, args) {
        // cek jika bod berada di voice channel
        const voiceChannel = message.guild.me.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('I\'m not currently in a voice channel.');
        }

        // cek jika user berada di voice channel yang sama
        const userVoiceChannel = message.member.voice.channel;
        if (!userVoiceChannel || userVoiceChannel.id !== voiceChannel.id) {
            return message.channel.send('You need to be in the same voice channel as me to use this command.');
        }

        // keluar dari voice channel
        voiceChannel.leave();
        return message.channel.send('Leaving the voice channel.');
    },
};
