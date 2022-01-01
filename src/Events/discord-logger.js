/*
TODO:

>  automatically create a fs. PH: year/month/day >> year folder, month folder, day folder.

>   log the messages using a message Collector

>   create a command that allows staff to request a pastebin link for the requested channel. (Date has to be specified)

 */

/*-------------------------------------------------------------*/
const config = require("../data/config.json");
const Event = require("../Structures/Event.js");
const moment = require("moment");

//node.js filesystem module
const fs = require("fs");


// module ready. The next code gets executed when the bot starts.
module.exports = new Event("ready", (client) => {
    //1. Check if the folder for today already exist.

    //dir = ../data/discord-logger/YEAR/MONTH/DAY

    const dir = `../AquiverDiscord-Bot/src/data/discord-logger/${moment().format(`YYYY`)}/${moment().format(`MMM`)}/${moment().format(`Do`)}`;
    console.log(dir);
    discordLogger();
    function discordLogger() {
        //checks if the dir does not exist
        if (!fs.existsSync(dir)) {
            //it does not ~ creates the dir
            console.log("Directory did not exist yet, Creating one right now.")
            fs.mkdirSync(dir, {
                recursive: true
            });
        } else {
            //Dir exist ~ continues
            console.log("Directory Exists!");
        }
    }
});
