const {Command} = require("discord.js-commando");

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      group: "moderation",
      memberName: "ban",
      description: "Bans someone.",
      examples: ["ban @User", "ban @User Reason.", "ban @User Reason 5"],
      userPermissions: ["BAN_MEMBERS"],
      clientPermissions: ["BAN_MEMBERS"],
      guildOnly: true,
      args: [
        {
          key: "member",
          prompt: "What user do you want to ban?",
          type: "member"
        },
        {
          key: "reason",
          prompt: "What is the reason for banning them?",
          type: "string",
          default: ""
        },
        {
          key: "number",
          prompt: "How many days should they be banned for?",
          type: "integer",
          default: 0
        }
      ]
    });
  }

  run(msg, {member, number, reason}) {
    var daysMessage = "";
    if (number > 0) {
      daysMessage = " You will be unbanned in "
        + number
        + " days.";
    }

    var reasonMessage = ".";
    if (reason) {
      reasonMessage = " for \""
        + reason
        + "\".";
    }

    var message = "You have been banned from "
      + msg.channel.guild.name
      + reasonMessage
      + daysMessage;
    member.send(message);

    if (number <= 0) {
      member.ban(reason = reason);
    } else {
      member.ban(number, reason);
    }

    return msg.say("They were banned successfully.");
  }
}
;