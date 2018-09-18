const {Command} = require("discord.js-commando");

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: "kick",
      group: "moderation",
      memberName: "kick",
      description: "Kicks someone.",
      examples: ["kick @User", "kick @User Reason."],
      userPermissions: ["KICK_MEMBERS"],
      clientPermissions: ["KICK_MEMBERS"],
      guildOnly: true,
      args: [
        {
          key: "member",
          prompt: "What user do you want to kick?",
          type: "member"
        },
        {
          key: "reason",
          prompt: "What is the reason for kicking them?",
          type: "string",
          default: ""
        }
      ]
    });
  }

  run(msg, {member, days, reason}) {
    var reasonMessage = ".";
    if (reason) {
      reasonMessage = " for \""
        + reason
        + "\*.";
    }

    var message = "You have been kicked from "
      + msg.channel.guild.name
      + reasonMessage;
    member.send(message);
    member.kick(reason);

    return msg.say("They were kicked successfully.");
  }
}
;