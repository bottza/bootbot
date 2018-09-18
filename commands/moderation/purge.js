const {Command} = require("discord.js-commando");

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "purge",
      group: "moderation",
      memberName: "purge",
      description: "Clears the last 100 messages in a channel.",
      examples: ["purge"],
      userPermissions: ["ADMINISTRATOR"],
      clientPermissions: ["MANAGE_MESSAGES"],
      guildOnly: true
    });
  }

  async run(msg) {
    msg.delete();
    var fetched = await msg.channel.fetchMessages({
      limit: 99
    });
    msg.channel.bulkDelete(fetched);
  }
}
;