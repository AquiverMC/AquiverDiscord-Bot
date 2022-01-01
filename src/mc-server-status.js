// const Event = require("../Structures/Event.js");
// const client = require("../Structures/client.js");
// const config = require("../data/config.json");
// const node = require('@linux123123/jspteroapi');
// const application = new node.Application(`${config.PteroHost}`, `${config.PteroAppKey}`); // for application API
// const Pclient = new node.Client(`${config.PteroHost}`, `${config.PteroToken}`); // for Client API
// const {MessageEmbed} = require("discord.js");
// const util = require("minecraft-server-util");
//
// let serverState;
// const sv = util.status(`${config.MCIP}`);
//
// const statusChannel = `${config.mcStatusChannelID}`;
//
//
// //states
// let online;
// let offline;
// let busy;
// let messageState;
//
// module.exports = new Event("ready", (client, message) => {
//     const res2 = Pclient.getServerResources(`${config.PteroServerID}`)// res = ServerResources
//     //res2.then(console.log);
//     res2.then(r => {
//         console.log(r.current_state)
//         serverState = r.current_state;
//     });
//     //let status = JSON.parse(res2);
//     //serverState = status["current_state"];
//    // console.log(serverState);
//
//     /*TODO:
//     Make sure it clears the channel when the code gets executed
//
//     Make sure it checks the status every ... s/m
//
//     Make sure the message updates everytime a status change happened.
//      */
//
//     if (serverState === "running"){
//         messageState = "Online"
//         online = true;
//         offline = false;
//         busy = false;
//     } else if (serverState === "offline"){
//         messageState = "offline"
//         online = false;
//         offline = true;
//         busy = false;
//     } else {
//         messageState = "busy"
//         busy = true;
//         offline = false;
//         online = false;
//     }
//     //runs the function.
//     updateChannel();
//
//     const statusEmbed = new MessageEmbed()
//         .setTitle(`Aquiver server Status`)
//         .setFields(
//             {name: "Status:", value: `${messageState}`, inline: true},
//             {name: "Players", value: `${sv.OnlinePlayer}/${sv.MaxPlayers}`, inline: true}
//         )
//         .setAuthor(`${config.botName}`, `${config.botIcon}`, `${config.botGitHub}`)
//         .setThumbnail(`${config.botIcon}`)
//     function updateChannel(){
//         //Clears the channel
//
//         statusChannel.messages.fetch({limit: 100})
//         statusChannel.bulkDelete(2).then(r => updateMessage());
//     }
//     function updateMessage(){
//         //sends the updated message
//         statusChannel.send("This channel will update every 5 minutes. We advise you to mute this channel if you do not want to be notified on the status of the server. you MAY get notifications.")
//         statusChannel.send({embeds: [statusEmbed]});
//     }
// });