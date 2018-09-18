const {Command} = require("discord.js-commando");

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: "webhook",
      group: "utility",
      memberName: "webhook",
      description: "Creates or deletes webhooks.",
      examples: ["webhook create test", "webhook delete test"],
      userPermissions: ["MANAGE_WEBHOOKS"],
      clientPermissions: ["MANAGE_WEBHOOKS"],
      guildOnly: true,
      args: [
        {
          key: "command",
          prompt: "Should I create or delete a webhook?",
          type: "string",
          validate: (text) => {
            return text == "create" || text == "delete";
          }
        },
        {
          key: "name",
          prompt: "What is/will it called?",
          type: "string"
        }
      ]
    });
  }

  async run(msg, {name, command}) {
    if (command == "create") {
      var webhook = await msg.channel.createWebhook(name, this.client.user.displayAvatarURL);
      return msg.say("The webhook was created! It's url is https://discordapp.com/api/webhooks/" + webhook.id + "/" + webhook.token + ".");
    } else {
      var webhooks = await msg.channel.fetchWebhooks();
      var webhook = webhooks.find("name", name);
      if (!webhook) {
        return msg.say("That webhook doesn't exist!");
      } else {
        webhook.delete();
        return msg.say("The webhook was deleted.");
      }
    }
  }
}
;