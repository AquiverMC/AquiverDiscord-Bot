
const config = require("../data/config.json");
const Event = require("../Structures/Event.js");
const moment = require("moment");

//node.js filesystem module
const fs = require("fs");


// module ready. The next code gets executed when the bot starts.
module.exports = new Event("ready", (client, message) => {
    //1. Check if the folder for today already exist.

    //dir = ../data/discord-logger/YEAR/MONTH/DAY

    const dir = `../AquiverDiscord-Bot/src/data/discord-logger/${moment().format(`YYYY`)}/${moment().format(`MMM`)}/${moment().format(`Do`)}`;
    const generalDir = `${dir}/general.txt`;
    const generalCh = client.channels.cache.get(`${config.GeneralID}`);
    const botcmdDir = `${dir}/botcmd.txt`;
    const botchannel = client.channels.cache.get(`${config.botChannelID}`);
    const mediaDir = `${dir}/media.txt`;
    const mediaCh = client.channels.cache.get(`${config.MediaID}`);
    const firstLine = `-={Aquiver Discord Logger}=- Made by: Timtendo12 ~ date: ${moment().format('dddd')}, ${moment().format('LL')}`;

    const generalCollector = generalCh.createMessageCollector({maxProcessed: 15000});
    const botcmdCollector = botchannel.createMessageCollector({maxProcessed: 15000});
    const mediaCollector = mediaCh.createMessageCollector({maxProcessed: 15000});

    checkDateDirExist();
    //checks the date every 5 minutes. Lets hope this does not take much CPU or RAM.
    setInterval(checkDateDirExist, 300*1000);

    function checkDateDirExist() {
        //checks if the dir does not exist
        if (!fs.existsSync(dir)) {
            //it does not ~ creates the dir
            //console.log("Directory did not exist yet, Creating one right now.")
            fs.mkdirSync(dir, {
                recursive: true
            });
            checkIfTXTExists();
        } else {
            //Dir exist ~ continues
            //console.log("Directory Exists!");
            checkIfTXTExists();
        }
    }

    function checkIfTXTExists() {
        const dirs = [generalDir, mediaDir, botcmdDir];
        const dirArrayLength = dirs.length;
        for (let i = 0; i < dirArrayLength; i++) {
            if (!fs.existsSync(dirs[i])) {
                fs.appendFile(dirs[i], firstLine, function (err) {
                    if (err) throw err;
                    console.log(`Created ${dirs[i]}`);
                    //genLogger();
                })
            } else {
                //console.log(`${dirs[i]} already exist`);
            }
        }
    }
    //data used: collector, dir
    const Dir2 = [generalDir, botcmdDir, mediaDir];
    const CHloggers = [generalCollector, botcmdCollector, mediaCollector];

    //variables for collector
    let collector;
    let dir2;
    let BotImageLink;
    let sender = "USER";

    CHArray();
    function CHArray() {
        const CHLoggersAL = CHloggers.length;
        for (let k = 0; k < CHLoggersAL; k++) {
            collector = CHloggers[k];
            collectorOn();
        }
    }

    function checkAttach(message) {
        if (message.attachments.size > 0) {
            message.attachments.forEach(attachment => {
                BotImageLink = `[${attachment.proxyURL}]`;
            })
        }
    }

    function checkSender(message) {
        if (message.author.bot) {
            sender = "BOT";
        }
    }

    function checkChannel(message){
        if (message.channel.id === config.botChannelID){
            dir2 = botcmdDir;
        } else if (message.channel.id === config.GeneralID){
            dir2 = generalDir;
        } else if (message.channel.id === config.MediaID){
            dir2 = mediaDir;
        }
    }

    function collectorOn() {
        collector.on(`collect`, message => {
            BotImageLink = ""
            checkAttach(message);
            checkSender(message);
            checkChannel(message)
            fs.appendFile(dir2, `\n[${moment().format('LTS')} ${sender}]: [${message.author.tag}] ${message.content} ${BotImageLink}`, err => {
                if (err) {
                    console.log(`Failed to log the message with attachment sent by ${sender} ${message.author.tag}`);
                    console.log(err);
                    return;
                }
                //console.log(dir2)
            });
        })
    }
});