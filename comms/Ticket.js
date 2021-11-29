const { MessageEmbed } = require('discord.js');
const commandeFormat = 'ticket';
const ticket_db = require('../dbticket.json');
const fs = require('fs');
const COLOR = require('../color-embeds.json');


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

		const channel = await msg.guild.channels.create(`ticket・${msg.author.username}`, {
			type: 'text',
			permissionOverwrites: [
				{
					id: msg.guild.id,
					deny: 'VIEW_CHANNEL',
				},
				{
					id: msg.author.id,
					allow: 'VIEW_CHANNEL',
				}],
		});

		if (ticket_db.tickets[msg.guild.id]) {
			ticket_db.tickets[msg.guild.id][channel.id] = {};
			ticket_db.tickets[msg.guild.id][channel.id] = {
				author: msg.author.id,
			};
		}
		else {
			ticket_db.tickets[msg.guild.id] = {};
			ticket_db.tickets[msg.guild.id][channel.id] = {};
			ticket_db.tickets[msg.guild.id][channel.id] = {
				author: msg.author.id,
			};
		}
		const user_ticket = JSON.stringify(ticket_db);
		fs.writeFile('./dbticket.json', user_ticket, function(err) {
			if (err) console.log('error', err);
		});

		const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';


		channel.send({ embeds: [new MessageEmbed ()
			.setColor(colorC)
			.setDescription (`Bonjour **${msg.member}**, bienvenue dans votre ticket. Nous allons nous occuper de vous.`)] });
		const msg_ = await msg.channel.send (`Votre ticket ${channel} a été créé !`);
		setTimeout(() => {
			msg_.delete();

		}, 10000);
	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};