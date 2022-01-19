const Discord = require('discord.js');
const commandeFormat = 'quote [MessageID]';
const ALIAS = [];
const COLOR = require('../../dbs/color-embeds.json');

module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] == args[0] || ALIAS.includes(args[0]));
};

/**
 *
 * @param {Discord.Message} msg
 */

module.exports.action = (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
        const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		// executer le code
        msg.channel.messages.fetch(args[1])
            .then(message => {
                if(message.content.type == 'embed') {
                    const embed = new Discord.MessageEmbed()
                        .setColor(colorC)
                        .setTimestamp()
                        .setFooter(`${msg.author.tag}`)
                    ;
                    msg.channel.send({ embeds: [message, embed] });

                } else if(message.content.type == 'text') {
                    const embed = new Discord.MessageEmbed()
                        .setColor(colorC)
                        .setTimestamp()
                        .setFooter(`${msg.author.tag}`)
                        .setDescription(message.content)
                    ;
                    msg.channel.send({ content: `${message}`, embeds: [embed] });
                }
            })
            .catch(console.error);
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};