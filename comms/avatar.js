const { MessageEmbed, MessageCollector } = require('discord.js');
const commandeFormat = 'avatar';
const ALIAS = [];
const COLOR = require('../dbs/color-embeds.json');

module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] == args[0] || ALIAS.includes(args[0]));
};

/**
 *
 * @param {Discord.Message} msg
 */
module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {

		// FIXME Terminer la commande avec la HypeSquad

		// executer le code
		const color = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		msg.delete();
		const member_ = msg.mentions.members.first();
		if (!member_) {
			const question = new MessageEmbed()
				.setTitle('De quelle membre voullez-vous voir l\'avatar ?')
				.setColor(color);
			const send_question = msg.channel.send({ embeds: [question] });

			const collector = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
			collector.on('collect', async msgg => {
				if (msgg.author.bot) return;
				if (msgg.author.id !== msg.author.id) return;
				await msgg.delete();
				// eslint-disable-next-line no-shadow
				const member_collected = msgg.mentions.members.first();
				if (!member_collected) return;
				if (member_collected.user.flags.toArray().includes('HOUSE_BRAVERY')) {
					// eslint-disable-next-line no-shadow
					const avatar = new MessageEmbed()
						.setTitle('Avatar de ' + member_collected.user.username)
						.setColor(color)
						.setAuthor(`${member_collected.user.username}`, member_collected.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }), member_collected.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
						.setFooter(`Avatar de ${member_collected.user.username} demandé par ${msg.author.username}`, member_collected.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
						.addFields (
							{ name: 'Nom d\'utilisateur', value: `${member_collected.user.username}${member_collected.user.tag}`, inline: false },
							{ name: 'Date de création du compte', value: `<t:${member_collected.user.createdTimestamp}>`, inline: true },
							{ name: 'ID', value: `${member_collected.user.id}` },
							{ name: 'HypeSquad :', value: 'Vous faites parti de la `House Bravery`' },
							{ name: 'Autres Badges', value: `${member_collected.user.flags.toArray()}` });
					msg.channel.send({ embeds: [avatar] });
				}
				else if (member_collected.user.flags.toArray().includes('HOUSE_BRILLIANCE')) {
					// eslint-disable-next-line no-shadow
					const avatar = new MessageEmbed()
						.setTitle('Avatar de ' + member_collected.user.username)
						.setColor(color)
						.setAuthor(`${member_collected.user.username}`, member_collected.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }), member_collected.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
						.setFooter(`Avatar de ${member_collected.user.username} demandé par ${msg.author.username}`, member_collected.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
						.addFields (
							{ name: 'Nom d\'utilisateur', value: `${member_collected.user.username}${member_collected.user.tag}`, inline: false },
							{ name: 'Date de création du compte', value: `<t:${member_collected.user.createdTimestamp}>  `, inline: true },							
							{ name: 'ID', value: `${member_collected.user.id}` },
							{ name: 'HypeSquad :', value: 'Vous faites parti de la `House Brilliance`' },
							{ name: 'Autres Badges', value: `${member_collected.user.flags.toArray()}` });
					msg.channel.send({ embeds: [avatar] });
					send_question.delete();
				}
				else if (member_collected.user.flags.toArray().includes('HOUSE_BALANCE')) {
					// eslint-disable-next-line no-shadow
					const avatar = new MessageEmbed()
						.setTitle('Avatar de ' + member_collected.user.username)
						.setColor(color)
						.setAuthor(`${member_collected.user.username}`, member_collected.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }), member_collected.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
						.setFooter(`Avatar de ${member_collected.user.username} demandé par ${msg.author.username}`, member_collected.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
						.addFields (
							{ name: 'Nom d\'utilisateur', value: `${member_collected.user.username}${member_collected.user.tag}`, inline: false },
							{ name: 'Date de création du compte', value: `<t:${member_collected.user.createdTimestamp}>  `, inline: true },
							{ name: 'ID', value: `${member_collected.user.id}` },
							{ name: 'HypeSquad :', value: 'Vous faites parti de la `House Balance`' },
							{ name: 'Autres Badges', value: `${member_collected.user.flags.toArray()}` });
					msg.channel.send({ embeds: [avatar] });
					await send_question.delete();
				}
				else {
					// eslint-disable-next-line no-shadow
					const avatar = new MessageEmbed()
						.setTitle('Avatar de ' + member_collected.user.username)
						.setColor(color)
						.setAuthor(`${member_collected.user.username}`, member_collected.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }), member_collected.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
						.setFooter(`Avatar de ${member_collected.user.username} demandé par ${msg.author.username}`, member_collected.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
						.addFields (
							{ name: 'Nom d\'utilisateur', value: `${member_collected.user.username}${member_collected.user.tag}`, inline: false },
							{ name: 'Date de création du compte', value: `<t:${member_collected.user.createdTimestamp}>  `, inline: true },
							{ name: 'ID', value: `${member_collected.user.id}` });
					msg.channel.send({ embeds: [avatar] });
				}
			});
		}
		else if (member_.user.flags.toArray().includes('HOUSE_BRAVERY')) {
			// eslint-disable-next-line no-shadow
			const avatar = new MessageEmbed()
				.setTitle('Avatar de ' + member_.user.username)
				.setColor(color)
				.setAuthor(`${member_.user.username}`, member_.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }), member_.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
				.setFooter(`Avatar de ${member_.user.username} demandé par ${msg.author.username}`, member_.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
				.addFields (
					{ name: 'Nom d\'utilisateur', value: `${member_.user.username}${member_.user.tag}`, inline: false },
					{ name: 'Date de création du compte', value: `<t:${member_.user.createdTimestamp}>  `, inline: true },
					{ name: 'ID', value: `${member_.user.id}` },
					{ name: 'HypeSquad :', value: 'Vous faites parti de la `House Bravery`' },
					{ name: 'Autres Badges', value: `${member_.user.flags.toArray()}` });
			msg.channel.send({ embeds: [avatar] });
		}
		else if (member_.user.flags.toArray().includes('HOUSE_BRILLIANCE')) {
			// eslint-disable-next-line no-shadow
			const avatar = new MessageEmbed()
				.setTitle('Avatar de ' + member_.user.username)
				.setColor(color)
				.setAuthor(`${member_.user.username}`, member_.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }), member_.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
				.setFooter(`Avatar de ${member_.user.username} demandé par ${msg.author.username}`, member_.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
				.addFields (
					{ name: 'Nom d\'utilisateur', value: `${member_.user.username}${member_.user.tag}`, inline: false },
					{ name: 'Date de création du compte', value: `<t:${member_.user.createdTimestamp}>  `, inline: true },
					{ name: 'ID', value: `${member_.user.id}` },
					{ name: 'HypeSquad :', value: 'Vous faites parti de la `House Brilliance`' },
					{ name: 'Autres Badges', value: `${member_.user.flags.toArray()}` });
			msg.channel.send({ embeds: [avatar] });
		}
		else if (member_.user.flags.toArray().includes('HOUSE_BALANCE')) {
			// eslint-disable-next-line no-shadow
			const avatar = new MessageEmbed()
				.setTitle('Avatar de ' + member_.user.username)
				.setColor(color)
				.setAuthor(`${member_.user.username}`, member_.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }), member_.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
				.setFooter(`Avatar de ${member_.user.username} demandé par ${msg.author.username}`, member_.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
				.addFields (
					{ name: 'Nom d\'utilisateur', value: `${member_.user.username}${member_.user.tag}`, inline: false },
					{ name: 'Date de création du compte', value: `<t:${member_.user.createdTimestamp}>  `, inline: true },
					{ name: 'ID', value: `${member_.user.id}` },
					{ name: 'HypeSquad :', value: 'Vous faites parti de la `House Balance`' },
					{ name: 'Autres Badges', value: `${member_.user.flags.toArray()}` });
			msg.channel.send({ embeds: [avatar] });
		}
		else {
			// eslint-disable-next-line no-shadow
			const avatar = new MessageEmbed()
				.setTitle('Avatar de ' + member_.user.username)
				.setColor(color)
				.setAuthor(`${member_.user.username}`, member_.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }), member_.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
				.setFooter(`Avatar de ${member_.user.username} demandé par ${msg.author.username}`, member_.user.displayAvatarURL({ format: 'png', size: 32, dynamic: true }))
				.addFields (
					{ name: 'Nom d\'utilisateur', value: `${member_.user.username}${member_.user.tag}`, inline: false },
					{ name: 'Date de création du compte', value: `<t:${member_.user.createdTimestamp}>  `, inline: true },
					{ name: 'ID', value: `${member_.user.id}` });
			msg.channel.send({ embeds: [avatar] });
		}
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};

/* .addFields(
				{ name: 'Nom d\'utilisateur', value: `${member.user.username}${member.user.tag}`, inline: false },
				{ name: 'Date de création du compte', value: `${member.user.createdAt}`, inline: true },
				{ name: 'ID', value: member.user.id },
				// FIXME Terminer la HyperSquad
				{ name: 'Liste des badges :', value: `${member.user.flags.toArray()}` },
			)*/