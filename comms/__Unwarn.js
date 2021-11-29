const { Discord, Permissions, MessageEmbed } = require('discord.js');
const commandeFormat = 'unwarn [membre] [raison]';
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
		const nmember = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Veuillez mentionner le membre à unwarn !');
		const nwarn = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Ce membre n\'a aucun warn.');
		const nexist = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Ce warn n\'existe pas.');
		const unwarned = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription(`${member} a été unwarn pour ${reason} !`);

		if (!msg.member.hasPermission('MANAGE_MESSAGES')) {return msg.channel.send({ embeds: [nperm] });}

		const member = msg.mentions.members.first();

		if (!member) {return msg.channel.send({ embeds: [nmember] });}

		if (!warn_db.warns[msg.guild.id][member.id]) {return msg.channel.send({ embeds: [nwarn] });}

		const warnIndex = parseInt(args[1], 10) - 1;

		if (warnIndex < 0 || !warn_db.warns[msg.guild.id][member.id][warnIndex]) {return msg.channel.send({ embeds: [nexist] });}

		const { reason } = warn_db.warns[member.id].splice(warnIndex, 1)[0];

		if (!warn_db.warns[msg.guild.id][member.id].length) delete warn_db.warns[msg.guild.id][member.id];

		fs.writeFileSync('./dbwarn.json', JSON.stringify(warn_db));

		msg.channel.send({ embeds: [unwarned] });

	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};
