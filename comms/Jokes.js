const { MessageEmbed, MessageCollector } = require('discord.js');
const commandeFormat = 'joke';
const ALIAS = ['jokes', 'blague', 'blagues'];
require('dotenv').config();
// blagues API
const BlaguesAPI = require('blagues-api');
const COLOR = require('../dbs/color-embeds.json');
const blagues = new BlaguesAPI(process.env.APIJOKE);

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
		// const blague = await blagues.random()
		if (args[1]) return;
		const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		const question = new MessageEmbed()
			.setTitle('Quelle type de blague voullez-vous ?')
			.setDescription(`> \`GLOBAL\`
			> \`DEV\` => Envoit une blague en rapport avec le développement
			> \`DARK\` => Envoit une blague de type "Dark" / "Raciste"
			> \`LIMIT\` => Envoit une blague pouvant porter à confusion de façon déconcertante
			> \`BEAUF\` => Envoit une blague beauf. Ya vraiment besoins d'en dire plus ? 🤔
			> \`BLONDES\` => Envoit une blague sur les blondes ( désolé 😩 )`);
		msg.channel.send({ embeds: [question] });
		const collector = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
		collector.on('collect', async msgg => {
			if (msgg.author.bot) return;
			// msg.delete()
			const cont = msgg.content.toLowerCase();
			if (cont === 'global') {
				const blague = await blagues.randomCategorized(blagues.categories.GLOBAL);
				const emb = new MessageEmbed()
					.setTitle(`Blague : ${blague.type}`)
					.setColor(colorC)
					.setDescription(`Blague : **${blague.joke}**\n\nRéponse : ||**${blague.answer}**||`)
                        ;
				msgg.channel.send({ embeds: [emb] });
			}
			else if (cont === 'dev') {
				const blague = await blagues.randomCategorized(blagues.categories.DEV);
				const emb = new MessageEmbed()
					.setTitle(`Blague : ${blague.type}`)
					.setColor(colorC)
					.setDescription(`Blague : **${blague.joke}**\n\nRéponse : ||**${blague.answer}**||`)
                        ;
				msg.channel.send({ embeds: [emb] });
			}
			else if (cont === 'dark') {
				const blague = await blagues.randomCategorized(blagues.categories.DARK);
				const emb = new MessageEmbed()
					.setTitle(`Blague : ${blague.type}`)
					.setColor(colorC)
					.setDescription(`Blague : **${blague.joke}**\n\nRéponse : ||**${blague.answer}**||`)
                        ;
				msg.channel.send({ embeds: [emb] });
			}
			else if (cont === 'limit') {
				const blague = await blagues.randomCategorized(blagues.categories.LIMIT);
				const emb = new MessageEmbed()
					.setTitle(`Blague : ${blague.type}`)
					.setColor(colorC)
					.setDescription(`Blague : **${blague.joke}**\n\nRéponse : ||**${blague.answer}**||`)
                        ;
				msg.channel.send({ embeds: [emb] });
			}
			else if (cont === 'beauf') {
				const blague = await blagues.randomCategorized(blagues.categories.BEAUF);
				const emb = new MessageEmbed()
					.setTitle(`Blague : ${blague.type}`)
					.setColor(colorC)
					.setDescription(`Blague : **${blague.joke}**\n\nRéponse : ||**${blague.answer}**||`)
                        ;
				msg.channel.send({ embeds: [emb] });
			}
			else if (cont === 'blondes') {
				const blague = await blagues.randomCategorized(blagues.categories.BLONDES);
				const emb = new MessageEmbed()
					.setTitle(`Blague : ${blague.type}`)
					.setColor(colorC)
					.setDescription(`Blague : **${blague.joke}**\n\nRéponse : ||**${blague.answer}**||`)
                        ;
				msg.channel.send({ embeds: [emb] });
			}
		});
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};