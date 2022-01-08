const { Permissions, MessageEmbed } = require('discord.js');
const commandeFormat = 'poll';
const ALIAS = [];
const reactions = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹'];


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
		const nperm = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.');
		const nquiz = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Veuillez indiquer la question à poser.');
		const nbrquestion = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Veuillez indiquer au moins 2 choix.');
		const maxnbrquestion = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Il ne peut pas y avoir plus de 20 choix.');
		msg.content.slice(6);
		if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return msg.channel.send({ embeds: [nperm] });
		const arg = args.slice(1);
		const [question, ...choices] = arg.join(' ').split(' | ');
		if (!question) return msg.channel.send({ embeds: nquiz });
		if (!choices.length) return msg.channel.send({ embeds: [nbrquestion] });
		if (choices.length > 20) return msg.channel.send({ embeds: [maxnbrquestion] });
		const sent = await msg.channel.send({ embeds: [new MessageEmbed()
			.setColor('#4ed5f8')
			.setTitle(question)
			.setDescription(choices.map((choice, i) => `${reactions[i]} ${choice}`).join('\n\n')) ] })
        ;
		let i = 0;
		for (i = 0; i < choices.length; i++) await sent.react(reactions[i]);
		msg.delete();
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend :**```.' + commandeFormat + '```**');
	}
};
