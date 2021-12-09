const Command = require("../Structures/command.js");
const config = require("../data/config.json");
const discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
module.exports = new Command({
    name: `ban`,
    descripton: `Ban a user with a reason`,
    async run(message, args, client) {
        // embeds
        const targetHasHigherRole = new MessageEmbed()
            .setTitle(`You have no premission to ban this account.`)
            .setDescription(`${message.mentions.members.first()} has a role with a higher position than yours.`)
            .setAuthor(`${config.botName}`, `${config.botIcon}`, `${config.botGitHub}`)
            .setColor("DARK_RED")
        const targetHasSameRole = new MessageEmbed()
            .setTitle(`You have no permission to ban this account.`)
            .setDescription(`${message.mentions.members.first()} has the same role position as yours.`)
            .setAuthor(`${config.botName}`, `${config.botIcon}`, `${config.botGitHub}`)
            .setColor("DARK_RED")
        const targetIsModerator = new MessageEmbed()
            .setTitle(`You cannot ban yourself dummy.`)
            .setDescription(`You are trying to ban yourself. No worries tho, The leave button should be accessible.`)
            .setAuthor(`${config.botName}`, `${config.botIcon}`, `${config.botGitHub}`)
            .setColor("DARK_RED")
        const noReason = new MessageEmbed()
            .setTitle(`You have provided no reason.`)
            .setDescription(`Please provide a reaon before banning someone. | Usage: ${config.prefix}ban {account} {reason}`)
            .setAuthor(`${config.botName}`, `${config.botIcon}`, `${config.botGitHub}`)
            .setColor("DARK_RED")
        const noTarget = new MessageEmbed()
            .setTitle(`You have not provided a target to ban.`)
            .setDescription(`Usage: ${config.prefix}ban {account} {reason}`)
            .setAuthor(`${config.botName}`, `${config.botIcon}`, `${config.botGitHub}`)
            .setColor("DARK_RED")
        const targetNotBannable = new MessageEmbed()
            .setTitle(`Target ban error`)
            .setDescription(`I could not ban ${message.mentions.members.first()}`)
            .setAuthor(`${config.botName}`, `${config.botIcon}`, `${config.botGitHub}`)


        //variables
        //the target is the first mentioned member in the ban command.
        const target = message.mentions.members.first();
        // The moderator who used the commando
        const moderator = message.author;
        //The reason
        let reason = args.slice(2).join(" ")

        //broing if checks
        if (!target) return message.reply({ embeds: [noTarget]});
        if (!reason) return message.reply({ embeds: [noReason] });
        if (target === message.author || target === message.member) return message.reply({embeds: [targetIsModerator]});
        if (target.roles.highest.position > message.member.roles.highest.position) return message.reply({ embeds: [targetHasHigherRole] });
        if (target.roles.highest.position === message.member.roles.highest.position) return message.reply({ embeds: [targetHasSameRole] });
        if (target.bannable === false) return message.reply({ embeds: [targetNotBannable] });

        const embed = new MessageEmbed()
            .setTitle(`<@${target.user.id}> has been been banned.`)
            .setThumbnail(target.user.displayAvatarURL({dynamic: true, size: 1024}))
            .setAuthor(`${config.botName}`, `${config.botIcon}`, `${config.botGitHub}`)
            .setColor("RED")
            .addFields(
                { name: 'Reason:', value: reason? reason : `No reason specified`, inline: true },
                { name: `Banned by:`, value: message.member.user.username, inline: true}
            )
            .setTimestamp()

        try {
            target.ban(reason).then(
                message.reply({ embeds: [embed] })
            )
        }catch(err) {
            message.reply({ embeds: [targetNotBannable] });
            console.log(err);
        }


    }
});