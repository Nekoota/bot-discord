module.exports = {
    name: 'ready',
    once: true, // indicates that this event should only be executed once
    execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
    },
};
