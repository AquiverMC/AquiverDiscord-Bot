
const Event = require("../Structures/Event.js");

const client = require("../Structures/client.js");

const config = require("../data/config.json");
const {MessageEmbed} = require("discord.js");

module.exports = new Event("messageCreate", (Client, message,) => {
    console.log(`${message.author.tag} >> ${message}`)


    //STOP THE ASKERS!
    if (message.content.toLowerCase().includes("server comes out?")){
        if (message.author.bot) return;
        if (message.member.roles.cache.has(`${config.crewID}`)) return;
        if (message.channel_id === config.GeneralID){
            message.channel.send(`Hey <@${message.author.id}>, We know you are excited for the server and so are we.\n 
            Due to the huge amount of questions we get everyday (also in dms) about the server I as a good bot wants to tell you that server currently HAS NOT opened yet\n 
            We also do not have a ETA of when the server will open! We're really busy and we want to take our time with the server <3`)
        }
    }
    if (message.content.toLowerCase().includes("server opens?")){
        if (message.author.bot) return;
        if (message.member.roles.cache.has(`${config.crewID}`)) return;
        if (message.channel_id === config.GeneralID){
            message.channel.send(`Hey <@${message.author.id}>, We know you are excited for the server and so are we.\n 
            Due to the huge amount of questions we get everyday (also in dms) about the server I as a good bot wants to tell you that server currently HAS NOT opened yet\n 
            We also do not have a ETA of when the server will open! We're really busy and we want to take our time with the server <3`)
        }
    }

    if (message.content.toLowerCase().includes("server open?")){
        if (message.author.bot) return;
        if (message.member.roles.cache.has(`${config.crewID}`)) return;
        if (message.channel_id === config.GeneralID){
            message.channel.send(`Hey <@${message.author.id}>, We know you are excited for the server and so are we.\n 
            Due to the huge amount of questions we get everyday (also in dms) about the server I as a good bot wants to tell you that server currently HAS NOT opened yet\n 
            We also do not have a ETA of when the server will open! We're really busy and we want to take our time with the server <3`)
        }
    }


    // checks if the message starts with the prefix.
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.substring(config.prefix.length).split(/ +/);

    const command = Client.commands.find(cmd => cmd.name === args[0]);

    if (!command) return message.reply(`Hmm, ${args[0]} does not seem like a valid command. Contact <@${config.admin_id}> if you think this is a bug.`);

    command.run(message, args, Client);
});