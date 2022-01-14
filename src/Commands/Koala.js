
const Command = require("../Structures/command.js");
const Discord = require("discord.js");
const config = require("../data/config.json")
const gen = require("images-generator");
const animal = "koala";

module.exports = new Command({
    name: `${animal}`,
    descripton: `Sends funny ${animal} photos`,
    async run(message, args, client) {
        //randomize messages

        let messages = [`Look! A ${animal}! 🐨`, "Isn't it a beauty? 🥺👉👈", "1 word! BEAU-TI-FULL! ☝️😌", "OMG OMG OMG OMG 🥺"];
        let messagesPick = Math.floor(Math.random() * messages.length);

        if (message.channel.id === config.botChannelID) {
            let animalImage = await gen.animal.koala();

            const animalEmbed = new Discord.MessageEmbed()
                .setDescription(`${messages[messagesPick]}`)
                .setColor("RANDOM")
                .setAuthor({name:`${config.botName}`,icon_url: `${config.botIcon}`,url: `${config.botGitHub}`})
                .setImage(animalImage)
                .setTimestamp();
            message.channel.send({embeds: [animalEmbed]});
        } else {
            const noBotChannel = new Discord.MessageEmbed()
                .setDescription(`Please use this command in <#${config.botChannelID}>`)
                .setColor("DARK_RED")
                .setAuthor({name:`${config.botName}`,icon_url: `${config.botIcon}`,url: `${config.botGitHub}`})
                .setTitle("No Permission.")
            message.reply({ embeds: [noBotChannel]});
        }
    }
})