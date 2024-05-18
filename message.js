const { prefix } = require('../config/config.json');

module.exports = {
    name: 'message',
    execute(message, client) {
        // ignore messages sent by the bot or messages without the prefix
        if (message.author.bot || !message.content.startsWith(prefix)) {
            return;
        }

        // split the message content into command and arguments
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // check if the command exists
        const command = client.commands.get(commandName);
        if (!command) {
            return message.channel.send('Unknown command. Type !help to see available commands.');
        }

        // execute command
        try {
            command.execute(message, args);
        } catch (error) {
            console.error('Error executing command:', error);
            message.channel.send('An error occurred while executing the command.');
        }
    },
};
