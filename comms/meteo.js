const weather = require('weather-js');

const commandeFormat = 'meteo';
const ALIAS = ['météo'];

const { MessageEmbed } = require('discord.js');

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
		const COLOR = require('../color-embeds.json');
		const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		if (!args[1]) {
			const db_meteo = require('../dbs/meteo.json');
			const city = db_meteo['meteo'][msg.guild.id]?.['city'] || 'Paris';
			weather.find({ search: city, degreeType: 'C' }, function(err, result) {
				try {

					const embed = new MessageEmbed()
						.setTitle(`Météo - ${result[0].location.name}`)
						.setColor(colorC)
						.setDescription('Les unités de température peuvent différer dans le temps')
						.addField('Temperature', `${result[0].current.temperature} Celcius`, false)
						.addField('Êtat du cliel', `${result[0].current.skytext}`, false)
						.addField('Humiditée', result[0].current.humidity, false)
						.addField('Vitesse du vent', result[0].current.windspeed, false)
						.addField('Heure d\'observation', result[0].current.observationtime, false)
						.addField('Sens du vent', result[0].current.winddisplay, false)
						.setThumbnail(result[0].current.imageUrl)
						.setImage('https://images-ext-2.discordapp.net/external/bx5QchMeHVxZVK5HEHefiry6ecnShy3POOZTTqSz7bQ/https/meteo.orange.fr/images/meteo/bulletin-meteo-2.png?width=195&height=108');
					msg.channel.send({ embeds: [embed] });
				}
				catch (err) {
					return msg.channel.send('Impossible de trouver les informations en rapport avec le lieux donné.');
				}
			});
			return;
		}
		weather.find({ search: args.join(' '), degreeType: 'C' }, function(err, result) {
			try {

				const embed = new MessageEmbed()
					.setTitle(`Météo - ${result[0].location.name}`)
					.setColor(colorC)
					.setDescription('Les unités de température peuvent différer dans le temps')
					.addField('Temperature', `${result[0].current.temperature} Celcius`, false)
					.addField('Êtat du cliel', `${result[0].current.skytext}`, false)
					.addField('Humiditée', result[0].current.humidity, false)
					.addField('Vitesse du vent', result[0].current.windspeed, false)
					.addField('Heure d\'observation', result[0].current.observationtime, false)
					.addField('Sens du vent', result[0].current.winddisplay, false)
					.setThumbnail(result[0].current.imageUrl)
					.setImage('https://images-ext-2.discordapp.net/external/bx5QchMeHVxZVK5HEHefiry6ecnShy3POOZTTqSz7bQ/https/meteo.orange.fr/images/meteo/bulletin-meteo-2.png?width=195&height=108');
				msg.channel.send({ embeds: [embed] });
			}
			catch (err) {
				return msg.channel.send('Impossible de trouver les informations en rapport avec le lieux donné.');
			}
		});
		// LETS CHECK OUT PKG
	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};
