const { MessageEmbed, Permissions } = require('discord.js');
const commandeFormat = 'kick [membre]';
const ALIAS = [];
const embeds = require('../../functions-handler/embeds')

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
		
		/* const botperm = new MessageEmbed()
			.setTitle('Erreur')
			.setColor('RED')
			.setDescription('Le bot ne peut pas exclure ce membre en raison de ses permissions.');*/
		if (!msg.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return msg.channel.send({ embeds: [nperm] });
		const member = msg.mentions.members.first();

		if (!member) return embeds.erreur(msg, `Veuillez spécifier un membre à \`kick\`.`)

		if (member.id === msg.guild.ownerID) return msg.channel.send({ embeds: [own] });
		/* if(msg.member.roles.cahce.get(highest).comparePositionTo(member.roles.cache.get(highest)) < 1 && msg.author.id !== msg.guild.ownerID) return msg.channel.send(
            {
                embeds: [badperm]
        })*/
		// if (!member.kickable) return msg.channel.send({ embeds: [botperm] });
		const raison = args.slice(1).join(' ') || 'Aucune Raison Fournie';
		await member.kick([raison]);
		const kicked = new MessageEmbed()
			.setTitle(`\`${member.user.tag}\` a été __éxclu__ avec succès ! `)
			.setColor('GREEN')
			.setDescription(`${member.user.tag} à été éxclu(e) avec succès par ${msg.author.tag}`);
		msg.channel.send({ embeds: [kicked] });
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};