
const Event = require("../Structures/Event.js");

const client = require("../Structures/client.js");

const config = require("../data/config.json");
const {MessageEmbed} = require("discord.js");

module.exports = new Event("messageCreate", (Client, message,) => {
    // checks if the message starts with the prefix.
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.substring(config.prefix.length).split(/ +/);

    const command = Client.commands.find(cmd => cmd.name === args[0]);

    if (!command) return message.reply(`Hmm, ${args[0]} does not seem like a valid command. Contact <@${config.admin_id}> if you think this is a bug.`);

    command.run(message, args, Client);
});