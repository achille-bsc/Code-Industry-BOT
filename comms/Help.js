const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require('discord.js');
const commandeFormat = 'help';
const ALIAS = ['aide'];
const COLOR = require('../color-embeds.json');

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

		const help_embed_2 = new MessageEmbed()
			.setTitle('🏠 Acceuil')
			.setDescription(`**Quelques liens utiles:**
			> [Support](https://discord.gg/tCmb8yGZYw)
			> [Inviter le bot](https://discord.com/oauth2/authorize?client_id=902293972091801620&scope=bot&permissions=8589934591)`)
			.setFooter('Choisissez une catégorie dans le sélecteur ci-dessous pour en consulter les commandes.')
			.setColor(colorC)
		;

		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('help')
					.setPlaceholder('Acceuil')
					.addOptions([
						{
							label: '🏠 Acceuil',
							description: 'Acceuil de la commande help',
							value: 'acc-help',
						},
						{
							label: '🔨 Modération',
							description: 'Toutes les commandes de Modération',
							value: 'mod-help',
						},
						{
							label: '💬 Conversation - Commandes de Conversations',
							description: 'Toutes les commandes de Conversations',
							value: 'conv-help',
						},
						{
							label: '⚙️ Configurations',
							description: 'Toutes le commandes de configurations',
							value: 'config-help',
						},
						{
							label: '💡 Informations',
							description: 'Toutes le commandes d\'informations',
							value: 'infos-help',
						},
						{
							label: '🛠️ Utilitaire',
							description: 'Toutes le commandes Utilitaires',
							value: 'utils-help',
						},
					]),
			)
        ;
		await msg.channel.send({ embeds: [help_embed_2], components: [row] });

	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};