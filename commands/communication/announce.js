const {Command} = require("discord.js-commando");
const {RichEmbed} = require("discord.js");

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "announce",
      group: "communication",
      memberName: "announce",
      description: "Posts an announcement.",
      examples: ["announce #announcements Important message!"],
      guildOnly: true,
      args: [
        {
          key: "channel",
          prompt: "What channel should I post the announcement in?",
          type: "channel"
        },
        {
          key: "content",
          prompt: "What would you like the content of the announcement to be?",
          type: "string"
        }
      ]
    });
  }

  async run(msg, {channel, content}) {
    if (!msg.member.guild.channels.find("id", channel.id).permissionsFor(msg.member).has("SEND_MESSAGES")) {
      return msg.reply("You do not have permission to use the `announce` command in that channel.");
    }
    var embed = new RichEmbed()
      .setDescription(content)
      .setAuthor(msg.author.username, msg.author.displayAvatarURL)
      .setColor(0x00AE86)
      .setTimestamp();
    await channel.send({
      embed
    });
    return msg.say("The announcement was posted.");
  }
}
;