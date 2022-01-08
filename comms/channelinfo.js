const { MessageEmbed } = require('discord.js');
const commandeFormat = 'channelinfos';
const ALIAS = ['channel-infos', 'channel-info', 'channelinfo', 'channinfos', 'channinfo'];
const COLOR = require('../color-embeds.json');

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
		const color = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		msg.delete();
		const channel = msg.channel;
		const embed_channel = new MessageEmbed()
			.setColor(color)
			.addFields(
				{ name: `<#${channel.name}>`, value: `Informations et statistiques de <#${channel.id}> (<#${channel.id}>)`, inline: false },
				{ name: 'Serveur', value: `${channel.guild.name} (${channel.id})`, inline: true },
				{ name: 'Catégorie', value: `${channel.parent.name}`, inline: true },
				{ name: 'Date de création', value: `${channel.createdTimestamp}`, iniline: true },
			)
        ;
		msg.channel.send({ embeds: [embed_channel] });
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};

/* .addFields(
				{ name: 'Nom d\'utilisateur', value: `${member.user.username}${member.user.tag}`, inline: false },
				{ name: 'Date de création du compte', value: `${member.user.createdAt}`, inline: true },
				{ name: 'ID', value: member.user.id },
				{ name: 'Liste des badges :', value: `${member.user.flags.toArray()}` },
			)*/