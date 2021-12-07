const Event = require("../Structures/Event.js");
const client = require("../Structures/client.js");
const config = require("../data/config.json");

module.exports = new Event("ready", (client) => {
    //logs logged in message
    console.log(`[Logged in as ${client.user.tag}]`);
    //set bots status
    client.user.setActivity('Aquiver SMP', { type: "PLAYING" });
    //last login log.
    console.log("Bot is online! Ready to mine some diamonds!");
});