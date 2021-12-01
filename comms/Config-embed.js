const { Permissions, MessageEmbed, MessageCollector } = require('discord.js');
const commandeFormat = 'color-embed';
const ALIAS = ['color', 'embed-color'];
const color_db = require('../dbs/color-embeds.json');
const fs = require('fs');
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
		const AUTHORID = msg.author.id;
		// executer le code
		const nperm = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.')
        ;
		if (!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			return msg.channel.send({ embeds: [nperm] });
		}

		const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';

		const question = new MessageEmbed()
			.setTitle('Quelle couleur voullez-vous asigner aux embeds ?')
			.setDescription('> `cancel`: Pour annuler la commande')
			.setColor(colorC);
		const send_question = await msg.reply({ embeds: [question] })
			.catch(console.error());
		// utilisation du collector !
		const collector = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
		collector.on('collect', msgg => {
			if (msgg.author.id !== AUTHORID) {
				return;
			}
			const cont = msgg.content;
			if (cont === 'cancel') {
				const annule = new MessageEmbed()
					.setTitle('Commande annulée !')
					.setColor('YELLOW');
				msgg.delete();
				msg.delete();
				send_question.delete();
				msgg.channel.send({ embeds:[annule] });
				collector.stop();
				return;
			}
			else {
				const format = new MessageEmbed()
					.setTitle('Mauvais Format !')
					.setDescription('La couleur doit être au format éxadécimal => `#ffffff`: blanc')
					.setFooter('Vous pouvez réésayer en écrivant votre couleur dans un autre message jusqu\'à 1 minute après l\'envoit de la première commande.')
					.setColor(colorC);
				if (cont.length < 7 || cont.length > 7) {
					msgg.delete();
					msgg.channel.send({ embeds: [format] });
					setTimeout(() => {
						msgg.channel.bulkDelete(1, true);
					}, 5000);
					return;
				}
				if (!cont.startsWith('#')) {
					msgg.delete();
					msgg.channel.send({ embeds: [format] });
					setTimeout(() => {
						msgg.channel.bulkDelete(1, true);
					}, 5000);
					return;
				}

				const color = msgg.content;
				const configured = new MessageEmbed()
					.setTitle('Configuration terminée !')
					.setColor(colorC)
					.setDescription(`Le couleur du serveur à été defini sur \`${color}\``)
                ;
				if (color_db['color-embed'][msgg.guild.id]) {
					delete (color_db['color-embed'][msgg.guild.id]);

					color_db['color-embed'][msgg.guild.id] = {};
					color_db['color-embed'][msgg.guild.id] = {
						color,
					};
				}
				else {
					color_db['color-embed'][msgg.guild.id] = {};
					color_db['color-embed'][msgg.guild.id] = {
						color,
					};
				}
				fs.writeFileSync('./color-embeds.json', JSON.stringify(color_db));
				msgg.delete();
				msg.delete();
				send_question.delete();
				msgg.channel.send({ embeds: [configured] });
				collector.stop();
			}
		});
	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};