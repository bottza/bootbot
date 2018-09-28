const {Command} = require("discord.js-commando");

const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const adapter = new FileSync("db.json")
const db = low(adapter)

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "postrules",
      group: "communication",
      memberName: "postrules",
      description: "Posts rules in a channel and gives users a role when they react.",
      examples: ["postrules #rules @Verified emojiname Important rule!!! Also, Important rule 2."],
      userPermissions: ["ADMINISTRATOR"],
      guildOnly: true,
      args: [
        {
          key: "channel",
          prompt: "What channel should the rules be posted in?",
          type: "channel"
        },
        {
          key: "role",
          prompt: "What role should you get after reacting?",
          type: "role"
        },
        {
          key: "emoji",
          prompt: "What emoji should be used? (Custom emojis only)",
          type: "string"
        },
        {
          key: "content",
          prompt: "What are the rules to post?",
          type: "string"
        }
      ]
    });
  }

  async run(msg, {content, channel, emoji, role}) {
    try {
      var emojiObj = this.client.emojis.find("id", emoji.slice(-19, -1));
    } catch (error) {
      return msg.say("That emoji wasn't found.");
    }
    try {
      var post = await channel.send("@everyone\nPlease read the rules:\n" + content + "\nReact with " + emojiObj + " to get verified.");
      await post.react(emojiObj);
    } catch(error) {
      return msg.say("Sorry, but I was unable to do that. Did you use a custom emoji?");
    }
    db.get("rulePosts").push({
      emoji: emojiObj.id,
      id: post.id,
      role: role.id
    }).write();
    return msg.say("The rules were posted.");
  }
}
;
