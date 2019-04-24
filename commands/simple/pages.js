const commando = require('discord.js-commando');
const Discord = require('discord.js')

class CoinFlipCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'pages',
            group: 'simple',
            memberName: 'pages',
            description: 'No description'
        });
    }
    exports.run = (client, message, args, tools) => {

        let pages = ['This is page one!', 'Second page'];
        let page = 1;

        const embed = new Discord.MessageEmbed()
            .setColor(0xffffff)
            .setFooter(`Page ${page} of ${page.length}`)
            .setDescription(pages[page-1])

        message.channel.send(embed).then(msg => {

          msg.react('\:arrow_backward:').then( r => {
              msg.react('\:arrow_forward:')

              const backwardsFilter = (reaction, user) => reaction.emoji.name === ':arrow_backward:' && user.id === message.author.id;
              const forwardsFilter = (reaction, user) => reaction.emoji.name === ':arrow_forward:' && user.id === message.author.id;


                const backwards = msg.creatReactionCollector(backwardsFilter, { time: 60000});
                const forwards = msg.creatReactionCollector(forwardsFilter, { time: 60000});


                backwards.on('collect', r => {
                    if (page === 1) return;
                    page--;
                    embed.setDescription(pages[page-1]);
                    embed.setFooter(`Page ${page} of ${pages.length}`)
                    msg.edit(embed)
                })

                forwards.on('collect', r => {    
                    if (page === pages.length) return;
                    page++;
                    embed.setDescription(pages[page-1]);
                    embed.setFooter(`Page ${page} of ${pages.length}`)
                    msg.edit(embed)

                })
            })

        })

    }

}

module.exports = CoinFlipCommand
