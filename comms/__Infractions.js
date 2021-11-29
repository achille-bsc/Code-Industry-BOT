const moment = require('moment');
const { Discord, MessageEmbed } = require('discord.js');
const commandeFormat = 'infractions [membre]';
const warn_db = require('../dbwarn.json');
const fs = require('fs');
const { error } = require('console');

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
			.setTitle('Erreur')
			.setColor('RED')
			.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.');
		const nmention = new MessageEmbed()
			.setTitle('Erreur')
			.setColor('RED')
			.setDescription('Veuillez mentionner le membre dont vous voulez voir les warns !');
		const nwarn = new MessageEmbed()
			.setTitle('Félicitations')
			.setColor('GREEN')
			.setDescription('**__Ce membre n\'a aucun warn !__**');
		if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send({ embeds: [nperm] });

		const member = msg.mentions.members.first();

		if (!member) return msg.channel.send({ embeds: [nmention] });
		if (!warn_db.warns[msg.guild.id][member.id]) {return msg.channel.send({ embeds: [nwarn] });}
		const embed = new Discord.MessageEmbed()
			.setDescription(`${warn_db.warns[msg.guild.id][member.id].length}\n\n__**10 derniers warns**__\n\n${warn_db.warns[msg.guild.id][member.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`);
		msg.channel.send({ embeds: [embed] });

	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};