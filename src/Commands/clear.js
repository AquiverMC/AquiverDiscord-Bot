const Command = require("../Structures/command.js");
const config = require("../data/config.json");
const {MessageEmbed} = require("discord.js");
const moment = require("moment");

module.exports = new Command({
    name: `clear`,
    descripton: `clears amount of messages`,
    async run(message, args, client) {

        //The given amount of messages to delete
        let amount = args.slice(1).join(" ");
        let isnum = /^\d+$/.test(amount);
        const verifyServer = client.guilds.cache.get(config.serverId);
        const member = await verifyServer.members.fetch(message.author.id);
        const server = client.guilds.cache.get(config.serverId);
        const logChannel = server.channels.cache.get(config.logChannel);

        //embeds
        const noAmount = new MessageEmbed()
            .setTitle(`You have not provided an amount`)
            .setDescription(`Please provide an amount of messages to delete`)
            .setAuthor({name: `${config.botName}`, icon_url: `${config.botIcon}`, url: `${config.botGitHub}`})

        const UnknownError = new MessageEmbed()
            .setTitle(`illegal argument.`)
            .setDescription(`An illegal argument was provided.`)
            .setAuthor({name: `${config.botName}`, icon_url: `${config.botIcon}`, url: `${config.botGitHub}`})
            .setFields({name: "Usage:", value: `${config.prefix}clear (amount)`, inline: true})

        const bulkDeleted = new MessageEmbed()
            .setTitle(`Messages cleared`)
            .setAuthor({name: `${config.botName}`, icon_url: `${config.botIcon}`, url: `${config.botGitHub}`})
            .addFields({ name: 'Messaged deleted:', value: amount? amount : `No amount specified or found... Strange..`, inline: true },
                { name: `Deleted by:`, value: message.author.tag? message.author.tag : "I can't seem to find out who executed this command..", inline: true})

        const bulkDeletedLog = new MessageEmbed()
            .setTitle(`BulkDelete command executed`)
            .setDescription(``)
            .setAuthor({name: `${config.botName}`, icon_url: `${config.botIcon}`, url: `${config.botGitHub}`})
            .addFields({ name: 'Messaged deleted:', value: amount? amount : `No amount specified or found... Strange..`, inline: true },
                { name: `executed by:`, value: message.author.tag? message.author.tag : "I can't seem to find out who executed this command..", inline: true})
            .addFields({ name: `channel:`, value: message.channel.name? message.channel.name : "I can't seem to find out where it was used.", inline: true})
            .setTimestamp()


        function sendConfirmation(message){
            message.channel.send({embeds: [bulkDeleted]});
            setTimeout(function (){

                message.channel.bulkDelete(1);

            }, 5000);
        }

        //check if the user has permissions
        if (!member.roles.cache.has(`${config.crewID}`)) return;

        if (!amount) {
            message.reply({embeds: [noAmount]});
        } else if (isnum) {
            await message.channel.bulkDelete(amount);
            setTimeout(sendConfirmation, 1000, message);
            logChannel.send({embeds: [bulkDeletedLog]});
        } else message.reply({embeds: [UnknownError]});
    }
});