
const Command = require("../Structures/command.js");
const Discord = require("discord.js");
const config = require("../data/config.json")
const gen = require("images-generator");

module.exports = new Command({
    name: `animal`,
    descripton: `Sends funny photos of an animal.`,
    async run(message, args, client) {
        //first we want to randomize the animal.
        const animals = ["koala", "dog", "cat", "panda", "redPanda", "duck", "bird", "shiba", "bunny", "fox"];
        //picks an random animal
        const getRandomFromArr = arr => arr[Math.floor(Math.random() * animals.length)];
        //locks the animal in the "animal" variable
        const animal = getRandomFromArr(animals);
        let animalImage;


        //randomize messages
        let messages = [`Look! A ${animal}! 🥰`, "Isn't it a beauty? 🥺👉👈", "1 word! BEAU-TI-FULL! ☝️😌", "OMG OMG OMG OMG 🥺"];
        let messagesPick = Math.floor(Math.random() * messages.length);

        if (message.channel.id === config.botChannelID || message.channel.id === "918152114088325180") {
            //if statements cause IDK how to do it else
            if (animal === "koala"){
                 animalImage = await gen.animal.koala();
            } else if (animal === "dog"){
                 animalImage = await gen.animal.dog();
            } else if (animal === "cat"){
                 animalImage = await gen.animal.cat();
            } else if (animal === "panda"){
                 animalImage = await gen.animal.panda();
            } else if (animal === "redPanda"){
                 animalImage = await gen.animal.redPanda();
            } else if (animal === "duck"){
                 animalImage = await gen.animal.duck();
            } else if (animal === "bird"){
                 animalImage = await gen.animal.bird();
            } else if (animal === "shiba"){
                animalImage = await gen.animal.shiba();
            } else if (animal === "bunny"){
                 animalImage = await gen.animal.bunny();
            } else {
                 animalImage = await gen.animal.fox();
            }
            const animalEmbed = new Discord.MessageEmbed()
                .setDescription(`${messages[messagesPick]}`)
                .setColor("RANDOM")
                .setImage(animalImage)
                .setTimestamp();
            message.channel.send({ embeds: [animalEmbed]} );
        } else {
            const noBotChannel = new Discord.MessageEmbed()
                .setDescription(`Please use this command in <#${config.botChannelID}>`)
                .setColor("DARK_RED")
                .setTitle("No Permission.")
            message.reply({ embeds: [noBotChannel]} );
        }
    }
})