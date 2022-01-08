const { MessageEmbed } = require('discord.js');
const commandeFormat = 'ping';
const COLOR = require('../dbs/color-embeds.json');

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
		const ping_embed = new MessageEmbed()
			.setColor(colorC)
			.setTitle('Ping :')
			.setDescription(`🏓Latence ( normale ) : ${Date.now() - msg.createdTimestamp}ms.`)
			.setThumbnail('https://dbdzm869oupei.cloudfront.net/img/sticker/preview/10870.png');
		msg.reply({ embeds: [ping_embed] });
	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend :**```' + commandeFormat + '```**');
	}
};