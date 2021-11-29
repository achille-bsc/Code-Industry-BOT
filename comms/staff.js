const { MessageEmbed, MessageCollector, WebhookClient, Permissions, Invite, InviteGuild } = require('discord.js');
const commandeFormat = 'staff';
const ALIAS = [];
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
		const invite = await msg.channel.createInvite({temporary: false, reason: `Demande d'aide au staff du Bot Code Industry`})

		const nperm = new MessageEmbed()
			.setTitle('Erreur')
			.setColor('RED')
			.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.');
		if (!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return msg.channel.send({ embeds: [nperm] });
		const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		msg.delete();
		const question = new MessageEmbed()
			.setTitle('Pour quelle raison voullez-vous faire appel au staff du bot ?')
			.setColor(colorC)
        ;
		const collector = await new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 90000 });
		const question_msg = await msg.channel.send({ embeds: [question] });
		collector.on('collect', async msgg => {
			if (msg.author.id === msgg.author.id) {
				const raison = msgg.content;
				msgg.delete();
				collector.stop();
				const info = new MessageEmbed()
					.setTitle('Informations')
					.setDescription(`Les informations suivantes seront partagés sur celui-ci
                    > **Le nom du serveur:** \`${msg.guild.name}\`
                    > **L'identifiant du serveur:** \`${msg.guild.id}\`
                    > **Votre pseudonyme:** \`${msg.author.username}\`
                    > **Votre tag:** \`${msg.author.tag}\`
                    > **Votre identifiant:** \`${msg.author.id}\`
                    > **La raison de votre demande d'aide:** \`${raison}\`
					> **Un lien d'invitation:** \`https://discord.com/invite/${invite.code}\``)
					.setColor(colorC)
					.addField('Voullez-vous confirmer l\'envoit de ces infos au staff du bot ?', '`oui` ou `non`')
                ;
				const collector2 = await new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 90000 });
				const infos = await msg.channel.send({ embeds: [info] });
				collector2.on('collect', async msggg => {
					if (msg.author.id === msggg.author.id) {
						if (msggg.content === 'oui') {
							infos.delete();
							msggg.delete();
							const yes = new MessageEmbed()
								.setTitle('Votre requête à été envoyée avec succès !')
								.setColor(colorC)
                            ;
							const hook = new WebhookClient({ url: 'https://discord.com/api/webhooks/905450271109427200/JWpwV-B38ZfHSYZiKDQJbzXiwkauobUsLs4tEk8u9tu8OT9I00_3gczA_wrwORfEhsr2' });
							const serv_info = new MessageEmbed()
								.setTitle('Informations')
								.setDescription(`**___Un nouveau serveu à besoin d'aide !___**

								> **Le nom du serveur:** \`${msg.guild.name}\`
								> **L'identifiant du serveur:** \`${msg.guild.id}\`
								> **Votre pseudonyme:** \`${msg.author.username}\`
								> **Votre tag:** \`${msg.author.tag}\`
								> **Votre identifiant:** \`${msg.author.id}\`
								> **La raison de votre demande d'aide:** \`${raison}\`
								> **Un lien d'invitation:** https://discord.com/invite/${invite.code}`)
								.setColor('#4ed5f8')
							;
							await hook.send({ embeds: [serv_info] });
							await msggg.channel.send({ embeds: [yes] });
							question_msg.delete();
						}
						else if (msggg.content === 'non') {
							infos.delete();
							msggg.delete();
							const no = new MessageEmbed()
								.setTitle('Votre requête à été annulée avec succès !')
								.setColor(colorC)
                            ;
							const result = await msggg.channel.send({ embeds: [no] });
						}
					}
				});
			}
		});


	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};