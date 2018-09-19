const {Command} = require("discord.js-commando");

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "purge",
      group: "moderation",
      memberName: "purge",
      description: "Clears the last n messages in a channel.",
      examples: ["purge", "purge 6"],
      userPermissions: ["MANAGE_MESSAGES"],
      clientPermissions: ["MANAGE_MESSAGES"],
      guildOnly: true,
      args: [
        {
          key: "limit",
          prompt: "How many messages should I purge?",
          type: "integer",
          default: 99,
          validate: value => value <= 99 ? true : "The limit should be less than or equal to 99."
        }
      ]
    });
  }

  async run(msg, {limit}) {
    await msg.delete();
    var fetched = await msg.channel.fetchMessages({
      limit: limit
    });
    msg.channel.bulkDelete(fetched);
  }
}
;