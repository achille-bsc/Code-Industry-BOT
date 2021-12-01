const { MessageEmbed, Permissions } = require('discord.js');
const { error } = require('../functions-handler/embeds');
const commandeFormat = 'ban [membre]';
const COLOR = require('../dbs/color-embeds.json');

const ALIAS = [];

const embeds = require('../functions-handler/embeds');
const mess = require('../functions-handler/messages')

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
		const color = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		mess.del(msg)
		const member = msg.mentions.members.first();
		if (!msg.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return embeds.erreur(msg, 'Vous n\'avez pas la permission d\'utiliser cette commande.');

		if (!member) return embeds.erreur(msg, 'Vous n\'avez pas mentionné(e) de membre')

		if (member.id === msg.guild.ownerID) return embeds.erreur(msg, 'Vous ne pouvez pas exclure le propriétaire du serveur !')

		try {
			await msg.guild.members.ban(member) 
			embeds.success(msg, `Le membre ${member.user.tag} à été éxclu(e) avec succès par ${msg.author.tag} !`, '#4FFA2C')
		} catch (e) {
			embeds.erreur(msg, `Une erreur s'est produite lors du bannissement du membre. Vous ne devriez jamais recevoir une erreur comme celle-ci.\nVeuillez présenter l'erreur suivante au staff du bot afin que le développer du bot règle le problème au plus vite:\n\`\`\`${e.name}:\n${e.message}\`\`\``)
		}
		
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};