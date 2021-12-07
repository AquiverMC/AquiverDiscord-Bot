const Command = require("../Structures/command.js");
const Discord = require("discord.js");
const config = require("../data/config.json")
const gen = require("images-generator");

module.exports = new Command({
    name: "cat",
    descripton: "sends funny cat photo's",
    async run(message, args, client) {
        console.log("cat command executed.")

        if (message.channel.id === config.botChannelID) {

            let catImage = await gen.animal.cat();

            const catEmbed = new Discord.MessageEmbed()
                .setDescription("Look a cat! 🐱")
                .setColor("RANDOM")
                .setImage(catImage)
                .setTimestamp();
            message.channel.send({embeds: [catEmbed]});
        } else {
            const noBotChannel = new Discord.MessageEmbed()
                .setDescription(`Please use this command in <#${config.botChannelID}>`)
                .setColor("DARK_RED")
                .setTitle("No Permission.")
                message.reply({ embeds: [noBotChannel]});
        }
    }
})