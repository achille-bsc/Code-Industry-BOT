const { MessageEmbed, WebhookClient, MessageCollector } = require('discord.js');
const commandeFormat = 'suggestion-bot';
const ALIAS = ['suggest-bot'];
const COLOR = require('../dbs/color-embeds.json');
const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/858361544538325023/TiTQ0kDDp0fnU060nu98_OkI4P7Senu6mJAxFF1C-4x_-PsM-p6iZ5Y4n0-NKhrjh93a' });

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
		msg.delete();
		const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';


		if (!args[1]) {
			const suggestmsg = await msg.channel.send('Quelle suggestion voullez-vous envoyer au support du bot ? ( Vous avez 1 minute avant que la commande ne soit annulée )');
			const collector = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
			collector.on('collect', msg2 => {
				msg2.delete();
				if (msg2.author.bot) return;
				const suggestion = msg2.content;
				const reponse = new MessageEmbed()
					.setTitle('Suggestion envoyée !')
					.setColor(colorC)
					.setDescription(suggestion);

				msg.channel.send({ embeds: [reponse], ephemeral: true });

				const embed = new MessageEmbed()
					.setTitle('Nouvelle suggestion')
					.setColor('#4ed5f8')
					.setDescription('**___Suggestion :\n___**' + suggestion);

				webhookClient.send({
					username: 'Nouvealle Suggestions',
					embeds: [embed],
				});
				suggestmsg.delete();
				collector.stop();
			});

		}
		else {


			const suggestion = msg.content.slice(9).trim('');

			const reponse = new MessageEmbed()
				.setTitle('Suggestion envoyée !')
				.setColor(colorC)
				.setDescription(suggestion);

			msg.channel.send({ embeds: [reponse], ephemeral: true });

			const embed = new MessageEmbed()
				.setTitle('Nouvelle suggestion')
				.setColor('#4ed5f8')
				.setDescription('**___Suggestion :\n___**' + suggestion);

			webhookClient.send({
				username: 'Nouvealle Suggestions',
				embeds: [embed],
			});
		}
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};