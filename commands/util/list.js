const { Command } = require('discord.js-commando')
const { stripIndents } = require('common-tags')

module.exports = class ListCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'list',
      memberName: 'list',
      group: 'util',
      description: 'Lists all commands or groups.',
      details: 'Lists all commands or groups with their enabled states.',
      aliases: [
        'show',
        'view',
        'viewall'
      ],
      examples: [
        'list commands',
        'list groups'
      ],
      throttling: {
        usages: 2,
        duration: 10
      },
      args: [
        {
          key: 'query',
          label: 'command/group',
          prompt: 'What would you like to see (commands, groups)? ',
          type: 'string',
          parse: value => value.toLowerCase(),
          validate: value => ['commands', 'groups'].includes(value)
        }
      ]
    })
  }

  run (message, args) {
    if (args.query === 'commands') {
      return message.say(stripIndents`
      __**Commands**__
      ${this.client.registry.commands.map(command =>
    `**${command.name}:** ${command.isEnabledIn(message.guild) ? 'Enabled' : 'Disabled'}`
  ).join('\n')}
    `)
    }
    return message.say(stripIndents`
      __**Groups**__
      ${this.client.registry.groups.map(group =>
    `**${group.name}:** ${group.isEnabledIn(message.guild) ? 'Enabled' : 'Disabled'}`
  ).join('\n')}
    `)
  }
}
