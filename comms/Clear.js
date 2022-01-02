const { Permissions, MessageEmbed, MessageCollector } = require('discord.js');
const commandeFormat = 'clear';
const ALIAS = ['delete', 'effecer', 'éffacer', 'éfface', 'efface', 'supprime'];
const COLOR = require('../dbs/color-embeds.json');
const embeds = require('../functions-handler/embeds');

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
		
		if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && msg.author.id !== '688098375697956905') {
			return msg.channel.send({ embeds: [embeds.erreur(msg, `Vous n'avez pas la permission d'utiliser cette commande !`)] });
		}
		const question_msg = await embeds.question(msg, `Combien de messages souhaitez-vous supprimer ?', 'Vous devez donner un nombre compris entre \`1\` et \`195\` !
		> \`cancel\` => Annuler la commande`)
			.catch();
		// utilisation du collector !
		const collector = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
		collector.on('collect', async msgg => {
			if (msgg.author.id !== msg.author.id) return;
			if (msgg.content === 'cancel') {
				const annule = new MessageEmbed()
					.setTitle('Commande annulée !')
					.setColor('YELLOW');
				msgg.delete();
				question_msg.delete();
				const cancel = await msgg.channel.send({ embeds:[annule] });
				setTimeout(() => {
					cancel.delete();
				}, 5000);
				collector.stop();
			} else {
		
				if (msgg.content > 198 || msgg.content < 1) {
					const not_exact = new MessageEmbed()
						.setTitle('Vous devez citer un nombre compris entre 1 et 198')
						.setColor(colorC);
					msgg.channel.send({ embeds: [not_exact] })
						.catch(msgg.channel.send(new MessageEmbed() .setTitle('Vous devez mettre un nombre') .setDescription('Vous ne venez pas de citer un nombre. Vous devez citer un nombre compris entre 1 et 198')),
						);
				}
				else {
					const number = parseInt(msgg.content) + 2;
					if (number > 99) {
						const number1 = number / 2;
						const number2 = number / 2;
						if (number1 % 1 === 0.5) {
							const number3 = number1 + 0.5;
							const number4 = number2 - 0.5;
							msgg.channel.bulkDelete(number3, true).catch();
							await waiting(1000);
							msgg.channel.bulkDelete(number4, true).catch();
							const rep = await embeds.success(msg, `\`${number-2} messages ont étés supprimés avec succès !\``)
							setTimeout(() => {
								rep.delete();
							}, 5000);await waiting();
							await collector.stop();
						}
						else {
							msgg.channel.bulkDelete(number1, true).catch();
							await waiting(1000);
							msgg.channel.bulkDelete(number2, true).catch();
							await collector.stop();
							const rep = await embeds.success(msg, `\`${number-2} messages ont étés supprimés avec succès !\``)
							await collector.stop();
							await waiting();
							rep.delete();

						}
					}
					else {
						await msgg.channel.bulkDelete(number, true).catch();
						const rep = await embeds.success(msg, `\`${number} messages ont étés supprimés avec succès !\``)
						await collector.stop();
						await waiting()
						rep.delete();
					}
				}
			}
		});
	}

	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};
async function waiting(time = 5000) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}