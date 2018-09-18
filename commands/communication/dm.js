const {Command} = require("discord.js-commando");

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "dm",
      group: "communication",
      memberName: "dm",
      description: "Sends a message to a user.",
      examples: ["dm @User Hi there!"],
      guildOnly: true,
      args: [
        {
          key: "user",
          prompt: "Which user do you want to send the DM to?",
          type: "user"
        },
        {
          key: "content",
          prompt: "What would you like the content of the message to be?",
          type: "string"
        }
      ]
    });
  }

  async run(msg, {user, content}) {
    await user.send(content);
    return msg.say("The DM was sent.");
  }
}
;