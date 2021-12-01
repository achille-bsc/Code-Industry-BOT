const { Permissions, MessageEmbed, MessageCollector } = require('discord.js');
const commandeFormat = 'prefix';
const ALIAS = [];
const color_db = require('../dbs/prefix.json');
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
			.setTitle('Quelle prefix voullez-vous asigner au bot ?')
			.setDescription('> `cancel`: Pour annuler la commande')
			.setColor(colorC);
		const send_question = await msg.reply({ embeds: [question] })
			.catch(console.error());
			// utilisation du collector !
		const collector = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
		collector.on('collect', async msgg => {
			if (msgg.author.id !== AUTHORID) {
				return;
			}
			await send_question.delete();
			await msg.delete();
			const cont = msgg.content;
			if (cont === 'cancel') {
				const annule = new MessageEmbed()
					.setTitle('Commande annulée !')
					.setColor('YELLOW');
				msgg.delete();
				const anul_send = await msgg.channel.send({ embeds:[annule] });
				setTimeout(() => {
					anul_send.delete();
				}, 5000);
				collector.stop();
			}
			else {
				const format = new MessageEmbed()
					.setTitle('Attention !')
					.setDescription('La longueure du préfix doit être inférieure ou égale à 3')
					.setFooter('Vous avez jusqu\'à 1 minute après l\'envoit de la première commande pour proposer un nouveau préfix.')
					.setColor(colorC);
				if (cont.length > 3) {
					msgg.delete();
					const error_lenght = msgg.channel.send({ embeds: [format] });
					setTimeout(() => {
						error_lenght.delete();
					}, 5000);
					return;
				}
				const prefix = msgg.content;
				const configured = new MessageEmbed()
					.setTitle('Configuration terminée !')
					.setColor(colorC)
					.setDescription(`Le prefix du serveur à été defini sur \`${prefix}\``)
                ;
				if (color_db['prefix'][msgg.guild.id]) {
					delete (color_db['prefix'][msgg.guild.id]);

					color_db['prefix'][msgg.guild.id] = {};
					color_db['prefix'][msgg.guild.id] = {
						prefix,
					};
				}
				else {
					color_db['prefix'][msgg.guild.id] = {};
					color_db['prefix'][msgg.guild.id] = {
						prefix,
					};
				}
				fs.writeFileSync('./prefix.json', JSON.stringify(color_db));
				msgg.delete();
				const accept_send = await msgg.channel.send({ embeds: [configured] });
				setTimeout(() => {
					accept_send.delete();
				}, 5000);
				collector.stop();
			}

		});
	}

	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**')
			.catch(console.error());
	}
};