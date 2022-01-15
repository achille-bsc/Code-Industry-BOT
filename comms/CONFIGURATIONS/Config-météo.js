const { Permissions, MessageEmbed, MessageCollector } = require('discord.js');
const commandeFormat = 'meteo-config';
const ALIAS = ['config-meteo', 'météo-config', 'config-météo'];
const city_db = require('../../dbs/meteo.json');
const fs = require('fs');
const COLOR = require('../../dbs/color-embeds.json');

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
			.setTitle('Veuillez donner une ville par défault pour la météo')
			.setDescription('> `cancel`: Pour annuler la commande')
			.setColor(colorC)
        ;
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
				const city = msgg.content;
				const configured = new MessageEmbed()
					.setTitle('Configuration terminée !')
					.setColor(colorC)
					.setDescription(`La ville météo par défaut du serveur à été defini sur sur la ville suivante: \`${city}\``)
                ;
				if (city_db['meteo'][msgg.guild.id]) {
					delete (city_db['meteo'][msgg.guild.id]);

					city_db['meteo'][msgg.guild.id] = {};
					city_db['meteo'][msgg.guild.id] = {
						city,
					};
				}
				else {
					city_db['meteo'][msgg.guild.id] = {};
					city_db['meteo'][msgg.guild.id] = {
						city,
					};
				}
				fs.writeFileSync('./db_meteo.json', JSON.stringify(city_db));
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