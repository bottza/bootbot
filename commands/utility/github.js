const {Command} = require("discord.js-commando");

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: "github",
      group: "utility",
      memberName: "github",
      description: "Posts a link to our GitHub.",
      examples: ["github"]
    });
  }

  run(msg) {
    msg.say("Did you know we're open source? Here's a link: https://git.io/bootbot");
  }
}
;