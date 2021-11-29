const { MessageEmbed } = require('discord.js');
const commandeFormat = 'host';
const ALIAS = [];
const COLOR = require('../color-embeds.json');

module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] == args[0] || ALIAS.includes(args[0]));
};

/**
 *
 * @param {Discord.Message} msg
 */

module.exports.action = (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
		// executer le code
		const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		msg.delete();
		const exampleEmbed = new MessageEmbed()
			.setColor(colorC)
			.setTitle('Hébergement du bot')
			.setDescription('Le bot est hébergé sur un serveur dédié de [dev-time](https://hosting.dev-time.eu/) dont voici les statistiques :')
			.addField('Éspace de stockage', '4,88 Go')
			.addField('RAM', '512 Mo')
        ;
		msg.channel.send({ embeds: [exampleEmbed] });
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};