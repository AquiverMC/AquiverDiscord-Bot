const Event = require("../Structures/Event.js");
const client = require("../Structures/client.js");
const config = require("../data/config.json");
const util = require('minecraft-server-util');


module.exports = new Event("ready", (client, message) => {

    const statusChannel = config.mcStatusChannelID;
    const ip = "play.aquiver.me"

    console.log("Checking if server is online.");
    util.status(`${ip}`)
        .then((result) => {
            //server is online
            console.log(`✅  | ${ip} is online`);
        })
        .catch((err) => {
            //server is offline
            console.log(`❌  | Could not find the server or the server is offline. IP: ${ip}`);
            console.log(err);
        })


});