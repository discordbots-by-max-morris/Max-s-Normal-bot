const commando = require('discord.js-commando');
const discord = require('discord.js');
const client = new commando.CommandoClient({
  owner: '359835581456580618', // Your ID here.
  commandPrefix: '*', // The prefix of your bot.
  unknownCommandResponse: true, // Set this to true if you want to send a message when a user uses the prefix not followed by a command
});

const activities_list = [
    "Sheriff Jake", 
    "LSCRP CAD",
    "LSCRP", 
    "Jake my papa",
    "Max Morris -Creator of the bot!"
    ]; // creates an arraylist containing phrases you want your bot to switch through.
client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});
// const defclient = new Discord.Client();
const path = require('path');
const chalk = require('chalk');
const error = chalk.bold.red;
const warn = chalk.keyword('orange');
const debug = chalk.cyan;
const sqlite = require('sqlite');
const sql = require('sqlite');
const { oneLine } = require('common-tags');
const ms = require('ms');
const dbots = require('superagent');
const request = require('request');
const { RichEmbed } = require('discord.js');
const fs = require('fs');
const os = require('os');



client.registry
  .registerGroups([
    ['general', 'general'],
    ['misc', 'Miscellaneous'],
    ['support', 'Support'],
    ['control', 'Bot Owners Only'],
    ['fun', 'Fun'],
    ['games', 'Games'],
    ['quote', 'Quote'],
    ['economy', 'Economy'],
    ['moderation', 'Moderation'],
    ['team', 'Team'],
    ['admin', 'Admin'],
    ['music', 'Music'],
    ['simple', 'simple'],
    ['util', 'util'],
    ['misc', 'Misc']
  ])

  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, 'commands'));

  global.currentTeamMembers = [];
  global.servers = {};

  client.on('message', function(message){
    if(message.content == 'Hello')
    {
        message.channel.sendMessage('Hello ' + message.author + ', how are you?');
    }
    if(message.content == 'Join')
    {
            message.member.send("Welcome to the server, I hope you have fun but rember read the rules!!!");
    }
    else if(message.content === "What's the current team?")
    {
        var teamInfo = new discord.RichEmbed()
            .setTitle("The current team mebers are:")
            .setColor("#fa00ff")
            .setThumbnail(message.author.avatarURL)
        for(var i = 0; i < currentTeamMembers.length; i++)
        {
            teamInfo.addField("Member" + (i+1).toString(),currentTeamMembers[i].username)
        }
        message.channel.send(teamInfo);
    }
});

client.on('message', function(message){
    if(message.content == 'Fine, how about you?')
    {
        message.reply('I am doing great!')
    }
});

  

client.login(process.env.BOT_TOKEN)
