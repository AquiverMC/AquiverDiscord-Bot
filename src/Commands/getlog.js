const Command = require("../Structures/command");
const config = require("../data/config.json");

const PastebinAPI = require('pastebin-js'),
    pastebin = new PastebinAPI({
        'api_dev_key' : `${config.PB_DEV}`,
        'api_user_name' : `${config.PB_USER}`,
        'api_user_password' : `${config.PB_PASS}`
    });
const moment = require("moment");
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: `getlog`,
    descripton: `Request logs of today.`,
    async run(message, args, client) {
        const definedLogFile = args.slice(1).join(" ");
        const verifyServer = client.guilds.cache.get(config.serverId);
        const member = await verifyServer.members.fetch(message.author.id);

        //dir
        const D = `../AquiverDiscord-Bot/src/data/discord-logger/${moment().format(`YYYY`)}/${moment().format(`MMM`)}/${moment().format(`Do`)}`;
        const DGen = `${D}/general.txt`
        const DBot = `${D}/botcmd.txt`
        const DMedia = `${D}/media.txt`

        //pastebin variables
        let dir;
        let title;
        let ch;
        let date;

        function checkRequestedLog(){
            if (definedLogFile.toLowerCase() === "general"){
                //General.txt is requested
                dir = DGen;
                title = `GEN_${moment().format(`YYYY`)}_${moment().format(`MMM`)}_${moment().format(`Do`)}`
                ch = "General"
                date = `${moment().format(`YYYY`)}_${moment().format(`MMM`)}_${moment().format(`Do`)}`
            } else if (definedLogFile.toLowerCase() === "botcommands" || definedLogFile.toLowerCase() === "bot" || definedLogFile.toLowerCase() === "botcmds"){
                //Botcmd.txt is requested
                dir = DBot;
                title = `BOT_${moment().format(`YYYY`)}_${moment().format(`MMM`)}_${moment().format(`Do`)}`
                ch = "bot-cmd"
                date = `${moment().format(`YYYY`)}_${moment().format(`MMM`)}_${moment().format(`Do`)}`
            } else if (definedLogFile.toLowerCase() === "media" || definedLogFile.toLowerCase() === "med"){
                //media.txt is requested
                dir = DMedia;
                title = `MED_${moment().format(`YYYY`)}_${moment().format(`MMM`)}_${moment().format(`Do`)}`
                ch = "Media"
                date = `${moment().format(`YYYY`)}_${moment().format(`MMM`)}_${moment().format(`Do`)}`
            }
        }

        if (!member.roles.cache.has(`${config.crewID}`)) return;
        if(message.channel.id !== config.CrewChatID) return;
        if (!definedLogFile){
            const noDefinedLog = new MessageEmbed()
                .setTitle("Please tell me which log file you want to view")
                .setDescription(`Usage: ${config.prefix}getlog general/botcommands/media`)
                .setAuthor({ name:`${client.user.tag}`,icon_url:`${client.user.displayAvatarURL()}`,url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley`})
            message.reply({embeds: [noDefinedLog]});
            return;
        }
        checkRequestedLog();
        pastebin.createPasteFromFile({
                filename: `${dir}`,
                title: `${title}`,
                format: null,
                privacy: 1,
                expiration: 'N'
            }).then(function (data) {
            //-----------------------------------------------
            //Embed message which gets sent in the logChannel.
            //-----------------------------------------------
            const pbAPILogEmbed = new MessageEmbed()
                .setTitle(`${title}`)
                .setURL(`${data}`)
                .setColor('AQUA')
                .setAuthor({name: `${message.author.tag}`,icon_url: `${message.author.displayAvatarURL()}`,url: `${data}`})
                .setTimestamp()
                .addFields(
                    { name: 'Channel:', value: ch? ch : `No reason specified`, inline: true },
                    { name: `Date:`, value: date? date : "No date specified", inline: true}
                )
            console.log(data);
            message.reply({embeds: [pbAPILogEmbed]});
        })
            .fail(function (err) {
                console.log(err);
            });
    }
});