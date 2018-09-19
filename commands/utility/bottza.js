const {Command} = require("discord.js-commando");

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: "bottza",
      group: "utility",
      memberName: "bottza",
      description: "Posts the invite for Bottza's Discord.",
      examples: ["bottza"]
    });
  }

  run(msg) {
    msg.say("Here's a link to Bottza's Discord server. Bottza is the group of people who made me. You can get support for me here. https://discord.io/bottza");
  }
}
;