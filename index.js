// -----commande console----- npx eslint --ext .js --ignore-path .gitignore .-----


// -----Paramétrage API Discord.js
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const COLOR = require('./dbs/color-embeds.json');

require('dotenv').config();


// TODO Changer le TOKEN du bot avant la mise en ligne de la maj.
client.login(process.env.TEST);

// -----Import DBs Configs-----
const PREFIXFILE = require('./dbs/prefix.json');


// -----Imports WebHooks-----


// -----Imports Fichers de Commandes-----
const COLOREMBED = require('./comms/Config-embed');
// const CONFIG = require('./comms/config.js')
const HELP = require('./comms/Help');
const HOST = require('./comms/Host');
const INVITE = require('./comms/Invite');
const JOKE = require('./comms/Jokes');
const KICK = require('./comms/kick');
const LOCK = require('./comms/Lock');
const POLL = require('./comms/Poll');
const PING = require('./comms/Ping');
const PREFIX = require('./comms/Config-prefix');
const SAY = require('./comms/Say');
const SUPPORT = require('./comms/support');
const SUGGEST = require('./comms/suggest_bot');
const UNLOCK = require('./comms/Unlock');
const CLEAR = require('./comms/Clear');
const AVATAR = require('./comms/avatar');
const BAN = require('./comms/ban.js');
const METEO = require('./comms/meteo');
const STAFF = require('./comms/staff');
const MEMBERCOUNT = require('./comms/membercount');
const CONFIGMETEO = require('./comms/Config-météo');
// const CONFIGMETEO = require('./comms/Config-météo');

client.discordTogether;


client.on('ready', () => {

	let i = 0;

	console.log(`Le code à bien été link sur le bot ${client.user.tag} :`);
	console.log(''),
	console.log('	 - Bot Oppérationnel'),
	console.log(''),
	console.log(''),
	console.log('');

	// Statut du Bot
	const statuses = [
		'ses engrenages...',
		'Un bon film.',
		'-help',
		'derrière toi',
		'-support',
		'la version V.1.0.5',
		'Karma Akabane#6802',
	];
	setInterval(() => {
		client.user.setActivity(statuses[i], { type: 'WATCHING', url: 'https://www.youtube.com/channel/UCoorq7xuhdcVe2hfRgu0_5g' });
		i = ++i % statuses.length;
	}, 7500);
	// TODO Règler le bug de ce système ou le désactiver pour la prochaine maj
	/*setInterval(function() {
		let serv = 0;
		client.guilds.cache.map(() => {
			serv = serv + 1;
		});
		const memberCountChannel = client.guilds.cache.get('854029220346855435').channels.cache.get('905521931732807701');
		memberCountChannel.setName(`${serv} serveurs `);
	}, 5000);*/
});

client.on('messageCreate', async msg => {
	const args = msg.content.trim().toLocaleLowerCase().split(' ');
	if (msg.bot) return;
	if (msg.guild) {
		const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		const content = msg.content;
		if (content === ('prefix')) {
			const prefix_embed = new MessageEmbed()
				.setTitle('<a:online:903897219600638002> Code Industry est opérationnel !')
				.setDescription(`Le préfixe utilisé sur le serveur est ${PREFIXFILE.prefix[msg.guild.id]?.prefix || '-'}.
				Pour exécuter une commande, vous pouvez faire \`${PREFIXFILE.prefix[msg.guild.id]?.prefix || '-'}[commande]\`
				
				Pour modifier ce préfix, utilisez la commande \`${PREFIXFILE.prefix[msg.guild.id]?.prefix || '-'}[prefix]\`
				Rendez-vous sur le [support](https://discord.gg/yG3PuG8qXe) pour plus d'aide ou d'informations.`)
				.setFooter(`${msg.guild.name}・`)
				.setColor(colorC)
			;
			await msg.delete().catch();
			msg.channel.send({ embeds: [prefix_embed] });
		}


		// Commands sans prefix

		// Commands avec prefix
		if (msg.content.startsWith(PREFIXFILE.prefix[msg.guild.id]?.prefix || '-')) {
			args[0] = args[0].substring(PREFIXFILE.prefix[msg.guild.id]?.prefix.length || 1);

			if (LOCK.check(args)) {
				return LOCK.action(msg, args,
				);
			}

			if (UNLOCK.check(args)) {
				return UNLOCK.action(msg, args,
				);
			}

			if (POLL.check(args)) {
				return POLL.action(msg, args,
				);
			}

			if (KICK.check(args)) {
				return KICK.action(msg, args,
				);
			}
			if (HELP.check(args)) {
				return HELP.action(msg, args,
				);
			}

			if (JOKE.check(args)) {
				return JOKE.action(msg, args,
				);
			}

			if (COLOREMBED.check(args)) {
				return COLOREMBED.action(msg, args,
				);
			}

			if (SAY.check(args)) {
				return SAY.action(msg, args,
				);
			}

			if (PING.check(args)) {
				return PING.action(msg, args,
				);
			}

			if (PREFIX.check(args)) {
				return PREFIX.action(msg, args,
				);
			}

			if (INVITE.check(args)) {
				return INVITE.action(msg, args,
				);
			}

			if (HOST.check(args)) {
				return HOST.action(msg, args,
				);
			}

			if (SUPPORT.check(args)) {
				return SUPPORT.action(msg, args,
				);
			}

			if (SUGGEST.check(args)) {
				return SUGGEST.action(msg, args,
				);
			}

			if (CLEAR.check(args)) {
				return CLEAR.action(msg, args,
				);
			}

			if (AVATAR.check(args)) {
				return AVATAR.action(msg, args, client,
				);
			}

			if (BAN.check(args)) {
				return BAN.action(msg, args, client,
				);
			}

			/* if (CHANNELINFOS.check(args)) {
				return CHANNELINFOS.action(msg, args, client,
				);
			}*/

			if (METEO.check(args)) {
				return METEO.action(msg, args, client,
				);
			}

			if (STAFF.check(args)) {
				return STAFF.action(msg, args, client,
				);
			}

			if (MEMBERCOUNT.check(args)) {
				return MEMBERCOUNT.action(msg, args, client,
				);
			}

			if (CONFIGMETEO.check(args)) {
				return CONFIGMETEO.action(msg, args, client,
				);
			}
		}
	}
	else if (args[0].startsWith('-')) {
		args[0] = args[0].substring(1);
	}
});


// ----- Commande Handler -----

client.on('interactionCreate', async interaction => {
	if (interaction.isSelectMenu()) {
		if (interaction.customId === 'help') {
			const row = new MessageActionRow()
				.addComponents(
					new MessageSelectMenu()
						.setCustomId('help')
						.setPlaceholder('Choisir la catégorie')
						.addOptions([
							{
								label: '🏠 Acceuil',
								description: 'Acceuil de la commande help',
								value: 'acc-help',
							},
							{
								label: '🔨 Modération',
								description: 'Toutes les commandes de Modération',
								value: 'mod-help',
							},
							{
								label: '💬 Conversation - Commandes de Conversations',
								description: 'Toutes les commandes de Conversations',
								value: 'conv-help',
							},
							{
								label: '⚙️ Configurations',
								description: 'Toutes le commandes de configurations',
								value: 'config-help',
							},
							{
								label: '💡 Informations',
								description: 'Toutes le commandes d\'informations',
								value: 'infos-help',
							},
							{
								label: '🛠️ Utilitaire',
								description: 'Toutes le commandes Utilitaires',
								value: 'utils-help',
							},
						]),
				)
			;
			if (interaction.values[0] == 'acc-help') {

				const colorC = COLOR['color-embed'][interaction.guild.id]?.color || '#4ed5f8';
				const help_embed_2 = new MessageEmbed()
					.setTitle('🏠 Acceuil')
					.setDescription(`**Quelques liens utiles:**
				> [Support](https://discord.gg/tCmb8yGZYw)
				> [Inviter le bot](https://discord.com/oauth2/authorize?client_id=902293972091801620&scope=bot&permissions=8589934591)`)
					.setFooter('Choisissez une catégorie dans le sélecteur ci-dessous pour en consulter les commandes.')
					.setColor(colorC)
				;

				await interaction.deferUpdate();
				await interaction.editReply({ embeds: [help_embed_2], components:[row] });
			}
			if (interaction.values[0] == 'mod-help') {
				const colorC = COLOR['color-embed'][interaction.guild.id]?.color || '#4ed5f8';
				const help_embed_2 = new MessageEmbed()
					.setDescription(`> **kick:** Éxpulse un membre du serveur.
					> **ban:** Banni un membre du serveur.
					> **lock:** Vérouille un salon textuel.
					> **staff:** Pour demander de l'aide au staff dirrectement depuis votre serveur (vaut mieux donner un lien d'invitation dans votre requête 😉)`)
					.setFooter('Choisissez une catégorie dans le sélecteur ci-dessous pour en consulter les commandes.')
					.setColor(colorC)
				;
				await interaction.deferUpdate();
				await interaction.editReply({ embeds: [help_embed_2], components:[row] });
			}
			if (interaction.values[0] == 'conv-help') {

				const colorC = COLOR['color-embed'][interaction.guild.id]?.color || '#4ed5f8';
				const help_embed_2 = new MessageEmbed()
					.setTitle('💬 Conversation - Commandes de Conversations')
					.setDescription(`> **clear:** Supprime un nombre de messages compris entre 1 et 19
				> **say:** Pour faire parler le bot à votre place.`)
					.setFooter('Choisissez une catégorie dans le sélecteur ci-dessous pour en consulter les commandes.')
					.setColor(colorC)
			;
				await interaction.deferUpdate();
				await interaction.editReply({ embeds: [help_embed_2], components:[row] });
			}
			if (interaction.values[0] == 'config-help') {

				const colorC = COLOR['color-embed'][interaction.guild.id]?.color || '#4ed5f8';
				const help_embed_2 = new MessageEmbed()
					.setTitle('⚙️ Configuration - Commandes de Configuration')
					.setDescription(`> **color-embed:** Configure la couleur des embeds du serveur.
				> **préfix:** Configure le préfix du bot sur le serveur.`)
					.setFooter('Choisissez une catégorie dans le sélecteur ci-dessous pour en consulter les commandes.')
					.setColor(colorC)
			;
				await interaction.deferUpdate();
				await interaction.editReply({ embeds: [help_embed_2], components:[row] });
			}
			if (interaction.values[0] == 'infos-help') {

				const colorC = COLOR['color-embed'][interaction.guild.id]?.color || '#4ed5f8';
				const help_embed_2 = new MessageEmbed()
					.setTitle('💡 Informations - Commandes d\'Informations')
					.setDescription(`> **help:** Donne la liste des commandes du bot.
				> **host:** Envoit des informations relatives à l'hébergement du bot.
				> **invite:** Invite le bot sur tonserveur.
				> **ping:** Donne la latence du bot.
				> **support:** Lien vers le serveur support.
				> **avatar:** Donne toutes les informations relatives à un utilisateur.`)
					.setFooter('Choisissez une catégorie dans le sélecteur ci-dessous pour en consulter les commandes.')
					.setColor(colorC)
			;
				await interaction.deferUpdate();
				await interaction.editReply({ embeds: [help_embed_2], components:[row] });
			}
			if (interaction.values[0] == 'utils-help') {

				const colorC = COLOR['color-embed'][interaction.guild.id]?.color || '#4ed5f8';
				const help_embed_2 = new MessageEmbed()
					.setTitle('🛠️ Utilitaire - Commandes Utilitaires')
					.setDescription(`> **joke:** Envoit une blague parmis une archive de plus de 1070 blagues.
				> **lock:** Vérouille un salon textuel ( **unlock:** Pour le réouvrir ).
				> **poll:** Ouvre un sondage sur le serveur.
				> **say:** Fais parler le bot.
				> **ticket:** Ouvre un ticket sur le serveur ( **close**: Pour le fermer).
				> **suggestion-bot:** Faire une suggestion au bot.
				> **avatar:** Pour voir différentes informations sur un membre du serveur.
				> **meteo:** Donne la météo pour un lieux donné.
				> **staff:** Permet de contacter le staff du bot en cas de problème avec le bot sur votre serveur *( il vaut mieux donner un liens d'invitation vers celui-ci pour plus d'éfficacité )*`)
					.setFooter('Choisissez une catégorie dans le sélecteur ci-dessous pour en consulter les commandes.')
					.setColor(colorC)
			;

				await interaction.deferUpdate();
				await interaction.editReply({ embeds: [help_embed_2], components:[row] });
			}
		}
	}
});


/* const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);

client.on('messageCreate', async msg => {
	const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
	if (msg.content === '-play liste') {
		msg.delete();
		const embed = new MessageEmbed()
			.setTitle('Liste des commandes de jeux')
			.setDescription(`> **play youtube:** Ouvrir Youtube together
			> **play poker:** Démarer une partie de poker
			> **play chess:** démarer une partie d'échecs
			> **play betrayal:** Démarer une partie de Betrayal
			> play fishing:** Démarer une partie de Fishington`)
			.addField('Attention', 'Attention, cette activitée est encore en développement du côté de discord. En cas de problème, n\'hésitez pas à venir nous le signaller sur le [serveur support](https://discord.gg/tCmb8yGZYw)')
			.setColor(colorC);
		msg.channel.send({ embeds: [embed] });
	}
	if (msg.content === '-play youtube') {
		msg.delete();
		if (msg.member.voice.channel) {
			client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'youtube').then(async invite => {
				const link = new MessageEmbed()
					.setTitle('Jouer')
					.setURL(invite.code)
					.setColor(colorC);
				msg.channel.send({ embeds: [link] });
				return;
			});
		}
	}
	if (msg.content === '-play poker') {
		msg.delete();
		if (msg.member.voice.channel) {
			client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'poker').then(async invite => {
				const link = new MessageEmbed()
					.setTitle('Jouer')
					.setURL(invite.code)
					.setColor(colorC);
				msg.channel.send({ embeds: [link] });
				return;
			});
		}
	}
	if (msg.content === '-play chess') {
		msg.delete();
		if (msg.member.voice.channel) {
			client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'chess').then(async invite => {
				const link = new MessageEmbed()
					.setTitle('Jouer')
					.setURL(invite.code)
					.setColor(colorC);
				msg.channel.send({ embeds: [link] });
				return;
			});
		}
	}
	if (msg.content === '-play betrayal') {
		msg.delete();
		if (msg.member.voice.channel) {
			client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'poker').then(async invite => {
				const link = new MessageEmbed()
					.setTitle('Jouer')
					.setURL(invite.code)
					.setColor(colorC);
				msg.channel.send({ embeds: [link] });
				return;
			});
		}
	}
	if (msg.content === '-play fishing') {
		msg.delete();
		if (msg.member.voice.channel) {
			client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'fishing').then(async invite => {
				const link = new MessageEmbed()
					.setTitle('Jouer')
					.setURL(invite.code)
					.setColor(colorC);
				msg.channel.send({ embeds: [link] });
				return;
			});
		}
	}
});*/


// const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8'