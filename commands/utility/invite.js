const {Command} = require("discord.js-commando");

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      group: "utility",
      memberName: "invite",
      description: "Posts the invite for this bot.",
      examples: ["invite"]
    });
  }

  run(msg) {
    msg.say("Here's a link to invite me to your server: https://bit.ly/2D6rPDD");
  }
}
;