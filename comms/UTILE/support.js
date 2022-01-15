const { MessageEmbed } = require('discord.js');
const commandeFormat = 'support';
const COLOR = require('../../dbs/color-embeds.json');

module.exports.check = (args) => {
	return commandeFormat.split(' ')[0] == args[0];
};

/**
     *
     * @param {Discord.Message} msg
     */

module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
		// executer le code
		msg.delete();
		const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		const exampleEmbed = new MessageEmbed()
			.setColor(colorC)
			.setTitle('Serveur support')
			.setURL('https://discord.gg/tCmb8yGZYw');
		msg.channel.send({ embeds: [exampleEmbed] });
	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};