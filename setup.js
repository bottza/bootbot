var prompts = require("prompts");
var chalk = require("chalk");
var fs = require("fs");

(async () => {
  var questions = [
    {
      type: "text",
      name: "token",
      message: "Your bot token",
      validate: value => !value ? "Please enter a bot token!" : true
    },
    {
      type: "number",
      name: "owner",
      message: "Your user id",
      validate: value => !value ? "Please enter a user id!" : true
    }
  ];
  var responses = await prompts(questions);
  if (!responses.token || !responses.owner) {
    console.log(chalk.red("Please enter values!"));
  } else {
    var string = "module.exports.token = \""
               + responses.token + "\";\n"
               + "module.exports.owner = \""
               + responses.owner + "\";";
               var fs = require("fs");
    fs.writeFile("config.js", string, function(error) {
      if (error) {
        console.log(chalk.red("Error in saving config!"));
        console.log(chalk.red(error.message));
      } else {
        console.log(chalk.green("Done saving config!"));
      }
    }); 
  }
})();