    
const { Command } = require('discord.js-commando');
const { Discord } = require('discord.js')

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'test',
			group: 'admin',
            memberName: 'test',
			description: 'Ends all bot functions safely.',
			examples: ['test']
		});
	}
	async run(message) {
        const rm = require('discord.js-reaction-menu');
        new rm.menu(message.channel, message.author.id, [new Discord.RichEmbed({title:'test'}), new Discord.RichEmbed({title:'test2'}),
            new Discord.RichEmbed({title:'test3'}), new Discord.RichEmbed({title:'test4'}), new Discord.RichEmbed({title:'test5'})]);
	}
};
