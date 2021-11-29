const { Permissions, MessageEmbed } = require('discord.js');
const commandeFormat = 'close';
const ALIAS = ['fermer'];
const ticket_db = require('../dbticket.json');
const fs = require('fs');

module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] == args[0] || ALIAS.includes(args[0]));
};

/**
 *
 * @param {Discord.Message} msg
 */

module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
		// executer le code
		const channel = msg.mentions.channels.first() || msg.channel;
		const nticket = new MessageEmbed()
			.setTitle('Erreur')
			.setColor('RED')
			.setDescription('Ce salon n\'est pas un ticket.');
		const permticket = new MessageEmbed()
			.setTitle('Erreur')
			.setColor('RED')
			.setDescription('Vous n\'avez pas la permission de fermer ce ticket.');
		const closed = new MessageEmbed()
			.setTitle('Fermeture !')
			.setColor('GREEN')
			.setDescription(`Le ticket ${channel.name} a été fermé !`);
		if (!ticket_db.tickets[msg.guild.id]?.[channel.id]) {
			return msg.reply({ embeds: [nticket] });
		}

		if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && ticket_db.tickets[channel.id] !== msg.author.id) {
			return msg.reply(
				{
					embeds: [permticket],
				});
		}

		delete ticket_db.tickets[msg.guild.id];
		fs.writeFileSync('./dbticket.json', JSON.stringify(ticket_db));
		await msg.reply({ embeds: [closed] });
		channel.delete();
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};
