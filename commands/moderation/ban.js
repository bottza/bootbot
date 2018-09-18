const {Command} = require("discord.js-commando");

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      group: "moderation",
      memberName: "ban",
      description: "Bans someone.",
      examples: ["ban @User", "ban @User Reason.", "ban @User 5 Reason"],
      userPermissions: ["BAN_MEMBERS"],
      clientPermissions: ["BAN_MEMBERS"],
      guildOnly: true,
      args: [
        {
          key: "user",
          prompt: "What user do you want to ban?",
          type: "member"
        },
        {
          key: "days",
          prompt: "How many days should they be banned for?",
          type: "integer",
          default: 0
        },
        {
          key: "reason",
          prompt: "What is the reason for banning them?",
          type: "string",
          default: ""
        }
      ]
    });
  }

  run(msg, {member, days, reason}) {
    var daysMessage = "";
    if (days > 0) {
      daysMessage = " You will be unbanned in "
        + days
        + " days.";
    }

    var reasonMessage = ".";
    if (reason) {
      reasonMessage = " for \""
        + reason
        + "\*.";
    }

    var message = "You have been banned from "
      + msg.channel.guild.name
      + reasonMessage
      + daysMessage;
    member.send(message);

    if (days <= 0) {
      member.ban(reason = reason);
    } else {
      member.ban(days, reason);
    }

    return msg.say("They were banned successfully.");
  }
}
;