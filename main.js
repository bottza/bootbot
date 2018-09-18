const {CommandoClient} = require("discord.js-commando");
const {RichEmbed} = require("discord.js");
const path = require("path");
const chalk = require("chalk");

const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const adapter = new FileSync("db.json")
const db = low(adapter)

const config = require("./config");

const client = new CommandoClient({
  commandPrefix: ";;",
  owner: config.owner,
  disableEveryone: false
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["fun", "Fun"],
    ["communication", "Communication"],
    ["moderation", "Moderation"],
    ["utility", "Utility"]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commands"));

client.on("ready", () => {
  console.log(chalk.green("The bot is ready!"));
  client.user.setActivity(client.commandPrefix + "help");
});

client.on("messageReactionAdd", (reaction, user) => {
  var posts = db.get("rulePosts");
  if (posts.find({
      id: reaction.message.id,
      emoji: reaction.emoji.name
    }).value()) {
    var member = reaction.message.guild.member(user);
    try {
      member.addRole(reaction.message.guild.roles.find("id", posts.find({
        id: reaction.message.id,
        emoji: reaction.emoji.name
      }).value().role));
    } catch (error) {
      console.log(error);
      user.send("Error giving you the role! You should contact an admin.");
    }
  }
});

client.on("guildMemberAdd", (member) => {
  var msgs = db.get("joinMsgs");
  if (msgs.find({
      server: member.guild.id
    }).value()) {
    var config = msgs.find({
      server: member.guild.id
    }).value();
    var embed = new RichEmbed()
      .setDescription("Welcome to our server! Make sure to look at "
        + member.guild.channels.find("id", config.rules)
        + ".")
      .setAuthor("@" + member.user.username + " joined", member.displayAvatarURL)
      .setColor(0x00AE86)
      .setTimestamp();
    member.guild.channels.find("id", config.channel).send({
      embed
    });
  }
});

client.on("guildMemberRemove", (member) => {
  var msgs = db.get("joinMsgs");
  if (msgs.find({
      server: member.guild.id
    }).value()) {
    var config = msgs.find({
      server: member.guild.id
    }).value();
    var embed = new RichEmbed()
      .setDescription("Today is a sad day.")
      .setAuthor(member.user.username + " left", member.displayAvatarURL)
      .setColor(0x00AE86)
      .setTimestamp();
    member.guild.channels.find("id", config.channel).send({
      embed
    });
  }
});

client.on("raw", packet => {
  if (!["MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(packet.t)) return;
  const channel = client.channels.get(packet.d.channel_id);
  if (channel.messages.has(packet.d.message_id)) return;
  channel.fetchMessage(packet.d.message_id).then(message => {
    const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
    const reaction = message.reactions.get(emoji);
    if (packet.t === "MESSAGE_REACTION_ADD") {
      client.emit("messageReactionAdd", reaction, client.users.get(packet.d.user_id));
    }
    if (packet.t === "MESSAGE_REACTION_REMOVE") {
      client.emit("messageReactionRemove", reaction, client.users.get(packet.d.user_id));
    }
  });
});

db.defaults({
  rulePosts: [],
  joinMsgs: []
}).write();
client.login(config.token);