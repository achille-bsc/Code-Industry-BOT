const { MessageEmbed } = require('discord.js');
const commandeFormat = 'channelinfos';
const ALIAS = ['channel-infos', 'channel-info', 'channelinfo', 'channinfos', 'channinfo', 'ci'];
const COLOR = require('../../color-embeds.json');

module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] == args[0] || ALIAS.includes(args[0]));
};

/**
 *
 * @param {Discord.Message} msg
 */
module.exports.action = async (msg, args, client) => {
	if (commandeFormat.split(' ').length <= args.length) {


		// executer le code
		const color = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		msg.delete();
		const channel = msg.channel;
		const embed_channel = new MessageEmbed()
			.setTitle(channel.name + `${channel.id}`)
			.setDescription(`Informations de ${channel.name}`)
			.setColor(color)
			.addFields(
				{ name: `Serveur`, value: `${channel.guild.name} (${channel.guild.id})`, inline: false },
				{ name: 'Catégorie', value: `${channel.parent.name} (${channel.parent.id})`, inline: true },
//				{ name: 'Permissions Code Industry', value: `${client.member.roles.highest.position}`, inline: true },
				{ name: 'Date de création', value: `<t:${channel.createdTimestamp}> (<t:${Math.floor(channel.createdTimestamp/1000)}:R>)`, iniline: true },
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