const Discord = require('discord.js');
const commando = require('discord.js-commando');

class help extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'helpmenu',
            memberName: 'helpmenu',
            group: 'admin',
            description: 'Get the help menu',
            guildOnly: false,

        });
    }

    async run(msg) {

        const option = commandSplitter.stringToArray(msg.content);

        createMessage(option[0]);

        function createMessage(string, bookmessage) {
            const embed = new Discord.RichEmbed({
                author: "Jace",
                color: 1645055,
                title: "Help",
                description: "Do you need help? I have a list of commands right here",
                timestamp: Date.now(),
            });
            embed.addBlankField();
            switch (string) {
                case "games":
                    break;
                case "music": {
                    embed.addField(`${process.env.BOT_PREFIX}play`, 'Start playing from a source', true);
                    embed.addField(`${process.env.BOT_PREFIX}yt {url}`, 'Start playing from youtube', true);
                    embed.addField(`${process.env.BOT_PREFIX}skip`, 'Skip the current song', true);
                    embed.addField(`${process.env.BOT_PREFIX}prev`, 'Go back to the previous song', true);
                    embed.addField(`${process.env.BOT_PREFIX}stop`, 'Stop playing music', true);
                    embed.addField(`${process.env.BOT_PREFIX}pause`, 'Pause the music', true);
                    embed.addField(`${process.env.BOT_PREFIX}resume`, 'Resume the paused music', true);
                }
                    break;
                case "utility": {
                    embed.addField(`${process.env.BOT_PREFIX}botinfo`, 'Techical info about me', true);
                    embed.addField(`${process.env.BOT_PREFIX}info`, 'Info about me', true);
                    embed.addField(`${process.env.BOT_PREFIX}help`, '\*cough\* \*cough\*', true);
                }
                    break;
                case "moderation": {
                    embed.addField(`${process.env.BOT_PREFIX}ban {user}`, 'Ban a user', true);
                    embed.addField(`${process.env.BOT_PREFIX}hackban {user}`, 'Ban a user that is not on the server', true);
                    embed.addField(`${process.env.BOT_PREFIX}mute {user}`, 'Mute a user', true);
                    embed.addField(`${process.env.BOT_PREFIX}kick {user}`, 'Kick a user', true);
                    embed.addBlankField(false);
                    embed.addField(`${process.env.BOT_PREFIX}unban {user}`, 'Unban a user', true);
                    embed.addField(`${process.env.BOT_PREFIX}unmute {user}`, 'Unmute a user', true);
                }
                    break;
                case "fun":
                    break;
                case "profile":
                    break;
                case "nsfw":
                    break;
                default: {
                    embed.addField("These are the categories I have", "Use this menu to see the categories i have. Y can also click emoji to get the list", false);
                    embed.addField(":game_die: Games", "``" + process.env.BOT_PREFIX + "help games``\n", true);
                    embed.addField(":musical_note: Music", "``" + process.env.BOT_PREFIX + "help music``\n", true);
                    embed.addField(":tools: Utility", "``" + process.env.BOT_PREFIX + "help utility``\n", true);
                    embed.addField(":hammer: Moderation", "``" + process.env.BOT_PREFIX + "help moderation``\n", true);
                    embed.addField(":smiley: Fun", "``" + process.env.BOT_PREFIX + "help fun``\n", true);
                    embed.addField(":card_index: Profiles", "``" + process.env.BOT_PREFIX + "help profile``\n", true);
                    embed.addField(":wink: NSFW", "``" + process.env.BOT_PREFIX + "help nsfw``\n", true);
                }
                    break;
            }

            embed.setThumbnail(msg.client.user.avatarURL);
            embed.setFooter("Developed by Max Morris#5487", msg.client.user.avatarURL);
            if (bookmessage !== undefined) {
                bookmessage.edit(embed).then(async function (result) {

                    reactions(result);

                })
            } else {
                msg.channel.send(embed).then(async function (result) {
                    await result.react("🎲");
                    await result.react("🎵");
                    await result.react("🛠");
                    await result.react("🔨");
                    await result.react("😃");
                    await result.react("📇");
                    await result.react("😉");

                    reactions(result);

                });

            }
        }
        function reactions(result)
        {
            const filter = (reaction, user) => {
                return ['🎲', '🎵', "🛠", "🔨", "😃", "📇", "😉"].includes(reaction.emoji.name) && user.id === msg.author.id;
            };
            result.awaitReactions(filter, {max: 1, maxEmojis: 1})
                .then(collected => {
                    const reaction = collected.first();
                    reaction.remove(msg.author.id);

                    switch (reaction.emoji.name) {
                        case ("🎲"): {
                            createMessage("games", result);
                        }
                            break;
                        case ("🎵"): {
                            createMessage("music", result);
                        }
                            break;
                        case ("🛠"): {
                            createMessage("utility", result);
                        }
                            break;
                        case ("🔨"): {
                            createMessage("moderation", result);
                        }
                            break;
                        case ("😃"): {
                            createMessage("run", result);
                        }
                            break;
                        case ("📇"): {
                            createMessage("profile", result);
                        }
                            break;
                        case ("😉"): {
                            createMessage("nsfw", result);
                        }
                            break;
                    }

                })
        }
    }
}

module.exports = help;
