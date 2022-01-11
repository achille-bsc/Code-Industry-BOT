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

module.exports.action = async (msg, args, client) => {
	if (commandeFormat.split(' ').length <= args.length) {
		// executer le code
		msg.delete();
		const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		const ping_embed = new MessageEmbed()
			.setColor(colorC)
			.setTitle('🏓 - Ping')
			.setDescription(`Latence du bot: Calcul en cours...
			Latence de l'API: Calcul en cours...`)
			.setThumbnail('https://dbdzm869oupei.cloudfront.net/img/sticker/preview/10870.png')
		;
		const message = await msg.channel.send({ embeds: [ping_embed] });
		await wait(2000)
		const seconde_ping_embed = new MessageEmbed()
			.setColor(colorC)
			.setTitle('🏓 - Ping')
			.setDescription(`Latence du bot: ${message.createdTimestamp - msg.createdTimestamp}ms.
			Latence de l'API: ${Math.round(client.ws.ping)}ms`)
			.setThumbnail('https://dbdzm869oupei.cloudfront.net/img/sticker/preview/10870.png')
		;

		message.edit({ embeds: [seconde_ping_embed] })
	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend :**```' + commandeFormat + '```**');
	}
};

function wait(time) {
	return new Promise(resolve => {
	  setTimeout(() => {
		  resolve()
	  }, time);
	});
  }