module.exports = {
    name: 'queue',
    description: 'View the current music queue',
    execute(message, args) {
        // cek jika disana ada queue musik
        const queue = message.client.queue;
        if (!queue || queue.length === 0) {
            return message.channel.send('There are no songs in the queue.');
        }

        // bangun pesan ku ewe
        const queueMessage = queue.map((song, index) => `${index + 1}. ${song.title}`).join('\n');

        // kirimkan queue musik
        message.channel.send(`**Music Queue:**\n${queueMessage}`);
    },
};
