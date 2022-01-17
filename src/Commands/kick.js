const Command = require("../Structures/command.js");
const config = require("../data/config.json");
const discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
module.exports = new Command({
    name: `kick`,
    descripton: `kick a user with a reason`,
    async run(message, args, client) {
        // embeds
        const targetHasHigherRole = new MessageEmbed()
            .setTitle(`You have no premission to kick this account.`)
            .setDescription(`${message.mentions.members.first()} has a role with a higher position than yours.`)
            .setAuthor({name:`${config.botName}`,icon_url: `${config.botIcon}`,url: `${config.botGitHub}`})
            .setColor("DARK_RED")
        const targetHasSameRole = new MessageEmbed()
            .setTitle(`You have no premission to kick this account.`)
            .setDescription(`${message.mentions.members.first()} has the same role position as yours.`)
            .setAuthor({name:`${config.botName}`,icon_url: `${config.botIcon}`,url: `${config.botGitHub}`})
            .setColor("DARK_RED")
        const targetIsModerator = new MessageEmbed()
            .setTitle(`You cannot kick yourself dummy.`)
            .setDescription(`You are trying to kick yourself. No worries tho, The leave button should be accessible.`)
            .setAuthor({name:`${config.botName}`,icon_url: `${config.botIcon}`,url: `${config.botGitHub}`})
            .setColor("DARK_RED")
        const noReason = new MessageEmbed()
            .setTitle(`You have provided no reason.`)
            .setDescription(`Please provide a reaon before kickning someone. | Usage: ${config.prefix}kick {account} {reason}`)
            .setAuthor({name:`${config.botName}`,icon_url: `${config.botIcon}`,url: `${config.botGitHub}`})
            .setColor("DARK_RED")
        const noTarget = new MessageEmbed()
            .setTitle(`You have not provided a target to kick.`)
            .setDescription(`Usage: ${config.prefix}kick {account} {reason}`)
            .setAuthor({name:`${config.botName}`,icon_url: `${config.botIcon}`,url: `${config.botGitHub}`})
            .setColor("DARK_RED")
        const targetNotkickable = new MessageEmbed()
            .setTitle(`Target kicked error`)
            .setDescription(`I could not kick ${message.mentions.members.first()}`)
            .setAuthor({name:`${config.botName}`,icon_url: `${config.botIcon}`,url: `${config.botGitHub}`})


        //variables
        //the target is the first mentioned member in the kick command.
        const target = message.mentions.members.first();
        // The moderator who used the commando
        const moderator = message.author;
        //The reason
        let reason = args.slice(2).join(" ")

        //broing if checks
        if (target === message.author || target === message.member) return message.reply({embeds: [targetIsModerator]});
        if (target.roles.highest.position > message.member.roles.highest.position) return message.reply({ embeds: [targetHasHigherRole] });
        if (target.roles.highest.position === message.member.roles.highest.position) return message.reply({ embeds: [targetHasSameRole] });
        if (!reason) return message.reply({ embeds: [noReason] });
        if (!target) return message.reply({ embeds: [noTarget]});
        if (target.kickable === false) return message.reply({ embeds: [targetNotkickable] });

        const embed = new MessageEmbed()
            .setTitle(`<@${target.user.id}> has been kickned.`)
            .setThumbnail(target.user.displayAvatarURL({dynamic: true, size: 1024}))
            .setAuthor({name:`${config.botName}`,icon_url: `${config.botIcon}`,url: `${config.botGitHub}`})
            .setColor("RED")
            .addFields(
                { name: 'Reason:', value: reason? reason : `No reason specified`, inline: true },
                { name: `kicked by:`, value: message.member.user.username, inline: true}
            )
            .setTimestamp()

        try {
            target.kick(reason).then(
                message.reply({ embeds: [embed] })
            )
        }catch(err) {
            message.reply({ embeds: [targetNotkickable] });
            console.log(err);
        }


    }
});