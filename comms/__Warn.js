const { Discord, Permissions, MessageEmbed } = require('discord.js');
const commandeFormat = 'warn [membre] [raison]';
const warn_db = require('../dbwarn.json');
const fs = require('fs');
const { error } = require('console');
const moment = require('moment');

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
		const nperm = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.');
		const nping = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Veuillez mentionner le membre à warn !');
		const nown = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Vous ne pouvez pas warn le propriétaire du serveur !');
		const badperm = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Vous ne pouvez pas warn ce membre en raison de vos permitionsactuelles.');
		const nreason = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Veuillez indiquer la raison du warn !');
		const warned = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Veuillez indiquer la raison du warn !');
		if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send({ embeds: [nperm] });


		const member = msg.mentions.members.first();

		if (!member) return msg.channel.send({ embeds: [nping] });
		if (member.id === msg.guild.ownerID) return msg.channel.send({ embeds: [nown] });
		if (msg.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && msg.author.id !== msg.guild.ownerID) {
			return msg.channel.send(
				{ embeds: [badperm] });
		}

		const reason = args.slice(2).join(' ');

		if (!reason) return msg.channel.send({ embeds: [nreason] });
		if (warn_db.warns[msg.guild.id]) {
			warn_db.warns[msg.guild.id][member.id] = [];
			warn_db.warns[msg.guild.id][member.id].unshift({
				reason,
				date: Date.now(),
				mod:  msg.author.id,
			});
		}

		else {
			warn_db.warns[msg.guild.id] = {};
			warn_db.warns[msg.guild.id][member.id] =
                {
                	reason,
                	date: Date.now(),
                	mod:  msg.author.id,
                };
		}
		fs.writeFileSync('./dbwarn.json', JSON.stringify(warn_db));
		msg.channel.send(`${member} a été warn pour ${reason} !`);
		member.send({ content: `Vous avez été Warn par **${ msg.author.username }** pour la raison suivante :\n - ${reason}` });


	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};