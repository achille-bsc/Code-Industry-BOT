// -----commande console----- npx eslint --ext .js --ignore-path .gitignore .-----

// -----Paramétrage API Discord.js


// MONGOOSE



const fs = require('fs')	

const { SlashCommandBuilder,
	SlashCommandBooleanOption,
	SlashCommandIntegerOption,
	SlashCommandChannelOption,
	SlashCommandMentionableOption,
	SlashCommandNumberOption,
	SlashCommandRoleOption,
	SlashCommandStringOption,
	SlashCommandSubcommandBuilder,
	SlashCommandSubcommandGroupBuilder,
	SlashCommandUserOption
} = require('@discordjs/builders');

const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, WebhookClient, GuildMemberRoleManager } = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,] });
const COLOR = require('./dbs/color-embeds.json');


// slash commands manager (discord.js)




const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/921055065979109408/L3UPiBAJKp_sMxSoT3L2RBjgrnkZyaQJochRKvXU-vrOgvgQLnKypOMenX1bAM_wVhVn' });



require('dotenv').config();
const bot = process.env.BOT;
const test = process.env.TEST;

const token = bot

// TODO Changer le TOKEN du bot avant la mise en ligne de la maj.
client.login(token);

// -----Import DBs Configs-----
const PREFIXFILE = require('./dbs/prefix.json');


// -----Imports WebHooks-----


// -----Imports Fichers de Commandes-----
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
const CONFIGWELLCOME = require('./comms/Config-Welcome');
const CONFIGGOODBYE = require('./comms/Config-Goodbye.js');
const ADMINTICKET = require('./comms/Adminticket');
const COLOREMBED = require('./comms/Config-embed')
const BOT = require('./comms/bot');
const ROLEREACT = require('./comms/Rolereact');
const BADVOC = require('./comms/bad-voc');
const ADDROLEBTN = require('./comms/AddRoleBtn')
const BADVOCLISTE = require('./comms/bad-voc-liste');
const CHANNELINFOS = require('./comms/channelinfo');
const CLEARCHANNEL = require('./comms/clearchannel.js')
const GETMYDATA = require('./comms/getmydata')

// const CONFIGMETEO = require('./comms/Config-météo');

const start_webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/929558891765833788/IkPqLfHisDa_OYqvV3iI1nL-g4jDrvXTLtnIgO2TQrc7fiEbNsk42C9lNrNNPsSiYnl6' });

const embeds = require('./functions-handler/embeds');
const mongoose = require('mongoose');
client.on('ready', async () => {

	// start connection with the DB

	try {

		await mongoose.connect(process.env.DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		console.log('Connected to the DB');
	} catch(e) {
		console.log('DB non connectée ! Voir l\'erreur ci-dessous\n\n', e)
		return process.exit();
	}


	// WebHook messag at bot starting

	/*
	Timesstamps durées

	une heure => 3600 secs
	une journée => 86400 secs
	une semaine => 604800 secs
	*/

	const embed = new MessageEmbed()
	.setTitle('Démarage - Code Industry')
	.setColor('#4ed5f8')
	.setDescription(`Le bot <@902293972091801620>, viens de démarer avec succès !

> L'heure et la date du démarage est: <t:${Math.floor(Date.now()/1000)}>

> Le développeur assur une durée de <t:${Math.floor(Date.now()/1000) + 604800}:R> ou plus avant la prochaine grosse mise à jour.

> Le développeur estime une durée entre <t:${Math.floor(Date.now()/1000) + 86400}:R> et <t:${Math.floor(Date.now()/1000) + 86400*3}:R> avant le prochaine mise à jour apportant la corrections de légers bugs`)
	;
	if(token === bot) {
		start_webhook.send({
			content: '<&@854029220346855435>',
			username: 'Start - Code Industry',
			avatarURL: 'https://i.imgur.com/7ZiAS1F.png',
			embeds: [embed],
		});
	}
	

	//client.guilds.cache.get()
		console.log(`Le code à bien été link sur le bot ${client.user.tag} :`);
		console.log(''),
		console.log('	 - Bot Oppérationnel'),
		console.log(''),
		console.log(''),
		console.log('');
	let i = 0;

	
	const package = require('./package.json')
	// Statut du Bot
	const statuses = [
		'ses engrenages...',
		'Un bon film.',
		'-help',
		'derrière toi',
		'-support',
		`la version V.${package.version}`,
		'Karma Akabane#6802',
	];
	setInterval(() => {
		client.user.setActivity(statuses[i], { type: 'WATCHING', url: 'https://www.youtube.com/channel/UCoorq7xuhdcVe2hfRgu0_5g' });
		i = ++i % statuses.length;
	}, 8571);
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
	if (msg.author.bot) return;
	if (msg.guild) {
		const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		const content = msg.content;
		if (content === 'prefix') {
			const prefix_embed = new MessageEmbed()
				.setTitle('<a:online:903897219600638002> Code Industry est opérationnel !')
				.setDescription(`Le préfixe utilisé sur le serveur est \`${PREFIXFILE.prefix[msg.guild.id]?.prefix || '-'}\`.
				Pour exécuter une commande, vous pouvez faire \`${PREFIXFILE.prefix[msg.guild.id]?.prefix || '-'}[commande]\`
				éxemple => \`${PREFIXFILE.prefix[msg.guild.id]?.prefix || '-'}help\`
				
				Pour modifier ce préfix, utilisez la commande \`${PREFIXFILE.prefix[msg.guild.id]?.prefix || '-'}prefix\`
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
				return PING.action(msg, args, client
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
				//CLEAR.off(msg);
			}

			if (AVATAR.check(args)) {
				return AVATAR.action(msg, args, client,
				);
			}

			if (BAN.check(args)) {
				return BAN.action(msg, args, client,
				);
			}

			if (CHANNELINFOS.check(args)) {
				return CHANNELINFOS.action(msg, args, client,
				);
			}

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
			if (CONFIGWELLCOME.check(args)) {
				return CONFIGWELLCOME.action(msg, args, client,
				);
			}
			if (CONFIGGOODBYE.check(args)) {
				return CONFIGGOODBYE.action(msg, args, client,
				);
			}
			if (ADMINTICKET.check(args)) {
				return ADMINTICKET.action(msg, args, client,
				);
			}
			if (BOT.check(args)) {
				return BOT.action(msg, args, client,
				);
			}
			if (ROLEREACT.check(args)) {
				return ROLEREACT.action(msg, args, client,
				);
			}

			if (BADVOC.check(args)) {
				return BADVOC.action(msg, args, client,
				);
			}

			if (ADDROLEBTN.check(args)) {
				return ADDROLEBTN.action(msg, args, client,
				);
			}

			if (BADVOCLISTE.check(args)) {
				return BADVOCLISTE.action(msg, args, client,
				);
			}

			/*if (CLEARCHANNEL.check(args)) {
				return CLEARCHANNEL.action(msg, args, client,
				);
			}*/

			if (GETMYDATA.check(args)) {
				return GETMYDATA.action(msg, args, client,
				);
			}
			
				
		}
	}
	else if (args[0].startsWith('-')) {
		args[0] = args[0].substring(1);
	}
});

// Auto-Modération

client.on('messageCreate', async msg => {
	// Auto-Modération -- Message Vérification
	if(msg.author.bot) return;
	const args = msg.content.trim().toLocaleLowerCase().split(' ');
	const voc_db = require('./dbs/bad-voc.json');
	const messageLowCase = msg.content.toLowerCase();
	const allowed_bad_voc = require('./dbs/authorizations.json')
	if(allowed_bad_voc.badvoc.includes(msg.guild.id)) {
		for(let i = 0; i < args.length; i++) {
			if(voc_db.voc.includes(args[i].toLowerCase())) {
				msg.delete().catch();
				const message_bw = await embeds.erreur(msg, `***__L'auto-Modération à détécté le mot__*** \`${args[i]}\` ***__ dans votre message__***. Il s'aggit d'un mot interdit. Faite attention à votre langage.\n\nVoici ton message afin que vous puissiez le corriger :\n\n\`\`\`${msg.content}\`\`\``, true);
				message_bw.react('❌');
			}
		}
	}

	// Auto-Modération -- Anti-Spam Vérification
	/*EN COURS DE RÉFLÉXION*/
})


// ----- Commande HELP -----

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
								label: '🔮 Premium',
								description: 'Commande prémium',
								value: 'premium-help',
							},
							{
								label: '🔨 Modération',
								description: 'Toutes les commandes de Modération',
								value: 'mod-help',
							},
							{
								label: '🤖 Auto-Modération',
								description: `Toutes les commandes de d'Auto-Modération`,
								value: 'automod-help',
							},
							{
								label: '⚙️ Configurations',
								description: 'Toutes le commandes de configurations',
								value: 'config-help',
							},
							{
								label: '💬 Conversation - Commandes de Conversations',
								description: 'Toutes les commandes de Conversations',
								value: 'conv-help',
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
					.setTitle(`🔨 Modération - Commandes de Modération`)
					.setDescription(`> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}kick :** Éxpulse un membre du serveur.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}ban :** Banni un membre du serveur.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}lock :** Vérouille un salon textuel.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}staff :** Pour demander de l'aide au staff dirrectement depuis votre serveur (vaut mieux donner un lien d'invitation dans votre requête 😉)`)
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
					.setDescription(`> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}clear :** Supprime un nombre de messages compris entre 1 et 195.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}say :** Pour faire parler le bot à votre place.`)
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
					.setDescription(`> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}color-embed :** Configure la couleur des principaux messages du bot.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}prefix :** Configure le préfix du bot.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}adminticket :** Configure le système de tickets.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}rolereact :** Permet la configuration du système de RôleRéaction.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}add-role-btn :** Permet d'ajouter un rôleréaction à n'importe quelle message du bot. Cela peut être utile pour faire plusieurs rôlereact sur un seul message.`)
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
					.setDescription(`> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}help :** Donne la liste des commandes du bot.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}host :** Envoit des informations relatives à l'hébergement du bot.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}invite :** Invite le bot sur ton serveur.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}ping :** Donne la latence du bot.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}support :** Lien vers le serveur support.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}avatar :** Donne toutes les informations relatives à un utilisateur.`)
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
					.setDescription(`> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}joke :** Envoit une blague parmis une archive de plus de 1070 blagues.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}lock :** Vérouille un salon textuel ( **unlock:** Pour le réouvrir ).
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}poll :** Ouvre un sondage sur le serveur.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}say :** Fais parler le bot.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}ticket :** Ouvre un ticket sur le serveur ( **close**: Pour le fermer).
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}suggestion-bot :** Faire une suggestion au bot.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}avatar :** Pour voir différentes informations sur un membre du serveur.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}meteo :** Donne la météo pour un lieux donné.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}staff :** Permet de contacter le staff du bot en cas de problème avec le bot sur votre serveur *( il vaut mieux donner un liens d'invitation vers celui-ci pour plus d'éfficacité )*`)
					.setFooter('Choisissez une catégorie dans le sélecteur ci-dessous pour en consulter les commandes.')
					.setColor(colorC)
			;

				await interaction.deferUpdate();
				await interaction.editReply({ embeds: [help_embed_2], components:[row] });
			}
			if (interaction.values[0] == 'premium-help') {

				const colorC = COLOR['color-embed'][interaction.guild.id]?.color || '#4ed5f8';
				const help_embed_2 = new MessageEmbed()
					.setTitle('🔮 Premium - Commandes Premium')
					.setDescription(`Il n'y a actuellement aucune commande premium.`)
					.setFooter('Choisissez une catégorie dans le sélecteur ci-dessous pour en consulter les commandes.')
					.setColor(colorC)
				;

				await interaction.deferUpdate();
				await interaction.editReply({ embeds: [help_embed_2], components:[row] });
			}
			if (interaction.values[0] == 'automod-help') {

				const colorC = COLOR['color-embed'][interaction.guild.id]?.color || '#4ed5f8';
				const help_embed_2 = new MessageEmbed()
					.setTitle(`🤖 Auto-Modération - Commandes d'Auto-Modération`)
					.setDescription(`> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}bad-voc :** Permet d'activer ou désactiver l'auto-modération des mots interdits sur le serveur.
> **${PREFIXFILE.prefix[interaction.guild.id]?.prefix || '-'}bad-words :** Permet d'avoir la liste de tout les mots interdits sur le serveur.`)
					.setFooter('Choisissez une catégorie dans le sélecteur ci-dessous pour en consulter les commandes.')
					.setColor(colorC)
				;

				await interaction.deferUpdate();
				await interaction.editReply({ embeds: [help_embed_2], components:[row] });
			}
		}
	}
});


client.on('guildMemberAdd', async (member) => {
	const wlc_db = require('./dbs/wellcome.json');
	const etat = wlc_db[member.guild.id]?.etat;
	const colorC = COLOR['color-embed'][member.guild.id]?.color || '#4ed5f8';
	const guild = member.guild;
	const member_count = guild.memberCount;
	const members_embed = new MessageEmbed()
		.setTitle('🎉 Bienvenue sur le serveur !')
		.setDescription(`> **${member.user.tag}** vient de rejoindre le serveur !\n> **${member_count}** membres au total.`)
		.setFooter('Avec les nouveaux membres, nous avons fait de nouvelles amitiés !')
		.setColor(colorC)
	;
	if(etat == 'on') {
	await member.guild.channels.cache.find(channel => channel.name === 'général').send(members_embed);
	} else {
		return;
	}
});

client.on('guildMemberRemove', async (member) => {
	const wlc_db = require('./dbs/goodbye.json');
	const colorC = COLOR['color-embed'][member.guild.id]?.color || '#4ed5f8';
	const guild = member.guild;
	const etat = wlc_db[member.guild.id]?.etat;
	const member_count = guild.memberCount;
	const members_embed = new MessageEmbed()
		.setTitle('💔 Au revoir !')
		.setDescription(`> **${member.user.tag}** vient de quitter le serveur !\n> **${member_count}** membres au total.`)
		.setFooter('Avec les nouveaux membres, nous avons fait de nouvelles amitiés !')
		.setColor(colorC)
	;
	if(etat == 'on') {
	await member.guild.channels.cache.find(channel => channel.name === 'general').send(members_embed);
	} else {
		return;
	}
});



client.on('interactionCreate', async interaction => {
	const embeds = require('./functions-handler/embeds')
	if (!interaction.isButton()) return;
	if(interaction.customId === 'ticket') {
		const member_name = interaction.member.user.username.toLocaleLowerCase().replace(' ', '-')
		const erreur_ever_opened = new MessageEmbed()
			.setTitle('Une erreur est survenue !')
			.setColor('#DB0501')
			.setDescription(`Vous avez déjà un ticket d'ouvert sur le serveur ! Vous ne pouvez pas en ouvrir un deuxieme !`)
		if(interaction.guild.channels.cache.find(chan => chan.name === `ticket-${member_name}`)) return interaction.reply( { embeds: [erreur_ever_opened], ephemeral: true } )
		const catégorie = await interaction.guild.channels.cache.find(cat=> cat.name === `Ticket` || cat.name === `ticket` || cat.name === `Tickets` || cat.name === `tickets`)
		const channel = await interaction.guild.channels.create(`Ticket ${interaction.member.user.username}`, {
			type: 'GUILD_TEXT',
			permissionOverwrites: [{
				id: interaction.guild.id,
				deny: ['VIEW_CHANNEL'],
			}, {
				id: interaction.member.id,
				allow: ['VIEW_CHANNEL'],
			}],
			parent: catégorie
		});
		interaction.reply({ content: `Votre ticket <#${channel.id}> à été créé avec succès !`, ephemeral: true })
		const colorC = COLOR['color-embed'][interaction.guild.id]?.color || '#4ed5f8';
		const message_ticket_db = require('./dbs/ticket-message.json') 
		const message_ticket = message_ticket_db['message']?.[interaction.guild.id]['message_into_ticket']
		const open_ticket = new MessageEmbed()
			.setTitle(`Ticket・${interaction.guild.name}`)
			.setDescription(`\`${message_ticket}\`` || `${interaction.member.user.username}, n'hésitez pas à dire au staff le sujet de ce ticket \:wink:`)
			.setColor(colorC)
		;

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('close')
					.setLabel('Fermer le Ticket')
					.setStyle('DANGER')
			)
		;


		channel.send({ content: `<@${interaction.member.user.id}>`, embeds: [open_ticket], components: [row] })
	}
	if(interaction.customId === 'close') {
		const colorC = COLOR['color-embed'][interaction.guild.id]?.color || '#4ed5f8';
		
		const open_ticket = new MessageEmbed()
			.setTitle(`Ticket ${interaction.guild.name}`)
			.setDescription(`${interaction.member.user.username}, vous vous apprétez à supprimer ce ticket. Etes-vous certain de vouloire faire ça ?`)
			.setColor(colorC)
		;

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('close_valide')
					.setLabel('Fermer Définitivement')
					.setStyle('DANGER'),
			)
			.addComponents(
				new MessageButton()
					.setCustomId('close_unvalide')
					.setLabel('❌ Anuler')
					.setStyle('SECONDARY'),
			)
		;


		interaction.reply({ embeds: [open_ticket], components: [row]})
		
	}
	if(interaction.customId === 'close_valide') {
		interaction.channel.delete();
	}

	if(interaction.customId === 'close_unvalide') {
		interaction.message.delete();
		
	}
});




// ROLE  RÉACTIONS HANDLER
client.on('interactionCreate', async interaction => {
	if(interaction.isButton) {
		const customid = interaction.customId;
		if(customid.startsWith('rolereact-')) {
			const role = interaction.guild.roles.cache.find(role => role.id === customid.replace('rolereact-', ''))
			if(!role) return interaction.reply({ content: `Le role \`${customid.replace('rolereact-', '')}\` n'existe pas !` })
			const colorC = COLOR['color-embed'][interaction.guild.id]?.color || '#4ed5f8';
			const role_react_embed = new MessageEmbed()
				.setTitle(`Rôle ${role.name}`)
				.setDescription(`Le rôle \`${role.name}\` vous à été ajouté avec succès !`)
				.setColor(colorC)
			;
			interaction.member.roles.add(role.id, 'Validation du Règlement')
			interaction.reply({ embeds: [role_react_embed], ephemeral: true })
		}
	}
})




client.on('interactionCreate', async interaction => {
	if(interaction.isButton) {
		const customid = interaction.customId;
		if(customid.startsWith('bad_words_alert_')) {
			if (customid.startsWith('bad_words_alert_no')) {
				if(interaction.guild.ownerId === interaction.member.id || interaction.member.id === '688098375697956905') {
					const auth_db = require('./dbs/authorizations.json')
					if (auth_db.badvoc.includes(interaction.guild.id)) {
						auth_db.badvoc.splice(auth_db.bad_voc.indexOf(interaction.guild.id), 1);
						fs.writeFileSync('./dbs/authorizations.json', JSON.stringify(auth_db));

						const embed = new MessageEmbed()
							.setTitle(`Le système à été correctement désactivé !`)
							.setColor('GREEN')
						
						interaction.reply({ embeds: [embed], ephemeral: true })
						interaction.message.delete().catch(() => {});
					} else {
						const embed = new MessageEmbed()
							.setTitle(`Le système à été correctement désactivé !`)
							.setColor('GREEN')
						;
						interaction.reply({ embeds: [embed], ephemeral: true })
						interaction.message.delete().catch(() => {});
						return;
					}
					
				} else {
					interaction.reply({ content: `Seul le propriétaire du serveur peut activer ce système !` })
					return;
				}
			} else if (customid.startsWith('bad_words_alert_yes')) {
				if(msg.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) || interaction.member.id === '688098375697956905') {
					const auth_db = require('./dbs/authorizations.json')
					if (auth_db.badvoc.includes(interaction.guild.id)) {
						
						auth_db.badvoc.push(interaction.guild.id);	
						fs.writeFileSync('./dbs/authorizations.json', JSON.stringify(auth_db));

						const embed = new MessageEmbed()
							.setTitle(`Le système à été correctement activé !`)
							.setColor('GREEN')
						;
						interaction.reply({ embeds: [embed], ephemeral: true })
						interaction.message.delete().catch(() => {});
					} else {
						auth_db.badvoc.push(interaction.guild.id);
						
						fs.writeFileSync('./dbs/authorizations.json', JSON.stringify(auth_db));

						const embed = new MessageEmbed()
							.setTitle(`Le système à été correctement activé !`)
							.setColor('GREEN')
						;
						interaction.reply({ embeds: [embed], ephemeral: true })
						interaction.message.delete().catch(() => {});
					}
					
				} else {
					interaction.reply({ content: `Seul le propriétaire du serveur peut activer ce système !` })
					return;
				}
			}
		}
	}
})

const GUILDCREATE = require('./guildcreate/config.js');

/*client.on('guildCreate', async guild => {
		return GUILDCREATE.action(
			guild, client,
		);
})*/