const {Command} = require("discord.js-commando");
const axios = require("axios");

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: "joke",
      group: "fun",
      memberName: "joke",
      description: "Says a bad joke.",
      examples: ["joke"]
    });
  }

  async run(msg) {
    var joker = axios.create({
      "baseURL": "https://icanhazdadjoke.com/",
      "headers": {
        "Accept": "text/plain"
      }
    });
    var joke = await joker.request({
      "url": "/",
      "method": "GET"
    });
    return msg.say(joke.data);
  }
}
;