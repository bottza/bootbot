const {Command} = require("discord.js-commando");
const coinflip = require("coinflip");

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: "flip",
      group: "fun",
      memberName: "flip",
      description: "Flips a coin.",
      examples: ["flip"]
    });
  }

  run(msg) {
    if (coinflip()) {
      return msg.say("Heads.");
    } else {
      return msg.say("Tails.");
    }
  }
}
;