const {Command} = require("discord.js-commando");
const {RichEmbed} = require("discord.js");

const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const adapter = new FileSync("db.json")
const db = low(adapter)

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "setupjoinmsgs",
      group: "communication",
      memberName: "setupjoinmsgs",
      description: "Sets up join and leave messages.",
      examples: ["setupjoinmsgs #welcomes-and-goodbyes #rules"],
      userPermissions: ["ADMINISTRATOR"],
      guildOnly: true,
      args: [
        {
          key: "channel",
          prompt: "What channel should I post join and leave messages in?",
          type: "channel"
        },
        {
          key: "rules",
          prompt: "Where is the rules channel?",
          type: "channel"
        }
      ]
    });
  }

  run(msg, {channel, rules}) {
    var msgs = db.get("joinMsgs");
    if (msgs.find({
        server: channel.guild.id
      }).value()) {
      msgs.find({
        server: channel.guild.id
      }).assign({
        channel: channel.id,
        rules: rules.id
      }).write();
    } else {
      msgs.push({
        server: channel.guild.id,
        channel: channel.id,
        rules: rules.id
      }).write();
    }

    var embed = new RichEmbed()
      .setDescription("Welcome to our server! Make sure to look at " + rules + ".")
      .setAuthor(msg.author.username + " joined", msg.author.displayAvatarURL)
      .setColor(0x00AE86)
      .setTimestamp();
    msg.say("Done! Here's a preview:");
    return msg.embed(embed);
  }
}
;