const { Permissions, MessageEmbed, MessageCollector, MessageActionRow, MessageButton } = require('discord.js');
const commandeFormat = 'rolereact';
const ALIAS = ['rolereact', 'rr'];
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
        msg.delete();
        // VARIABLES LISTE
        let content = '';
        let color = '';
        let role_id = '';
        const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		// executer le code
        // GESTION DES PERMISSIONS DE L'UTILISATEUR
        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && msg.author.id !== '688098375697956905') {
			return msg.channel.send({ embeds: [embeds.erreur(msg, `Vous n'avez pas la permission d'utiliser cette commande !`)] });
		}
        // DÉBUT DU CODE !
        const demande_button = await embeds.question(msg, `Quelle message voullez-vous mettre dans le boutton ?`, `Le contenu du message sera le contenu du boutton du rôle réaction.`)
        let collector = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
        collector.on('collect', async m => {
            m.delete();
            demande_button.delete();
            if( m.content.length < 80 ) {
                embeds.success(msg, `Le message \`${m}\` a bien été ajouté au rôle-réaction !`);
                collector.stop();
            } else {
                embeds.erreur(msg, `Le message est trop long !`);
                return;
            }
            content = m.content;
            const demande_color_button = await embeds.question(msg, `Quelle couleur voullez-vous que le boutton ai ?`, `\`vert\`\n\`rouge\`\n\`bleu\`\n\`gris\``)
            let collector1 = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
            collector1.on('collect', async m1 => {
                m1.delete();
                demande_color_button.delete();
                if(m1.author.bot) return;

                if(m1.content === 'vert') {
                    color = 'SUCCESS';
                    collector1.stop();
                } else if(m1.content === 'rouge') {
                    color = 'DANGER';
                    collector1.stop();
                } else if(m1.content === 'bleu') {
                    color = 'PRIMARY';
                    collector1.stop();
                } else if(m1.content === 'gris') {
                    color = 'SECONDARY';
                    collector1.stop();
                } else {
                    embeds.erreur(msg, `La couleur n'est pas valide !`);
                    return;
                }
                const demande_rôle = await embeds.question(msg, `Quelle rôle voullez-vous que le boutton ajoute ?`, `Veuillez ne spécier que l'id du rôle.`)
                let collector2 = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
                collector2.on('collect', async m2 => {
                    
                    demande_rôle.delete();
                    if(m2.content.length === 18) {
                        const role = await m2.guild.roles.fetch(m2.content);
                        if(role) {
                            role_id = m2.content;
                            const Rolereact = new MessageEmbed()
                                .setTitle(`Rôle-réaction`)
                                .setDescription(`Appuyez sur le boutton ci-dessous pour avoir le rôle \`${role.name}\``)
                                .setColor(colorC)
                                .setTimestamp
                            ;
                            const row = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setCustomId(`rolereact-${role_id}`)
                                        .setLabel(content)
                                        .setStyle(color),
                                );
                            msg.channel.send({ embeds: [Rolereact], components: [row] })
                            embeds.success(msg, `Le rôle-réaction a bien été ajouté au seveur !`)
                            collector.stop();
                        } else {
                            embeds.erreur(msg, `Le rôle n'existe pas !`);
                            return;
                        }
                    }
                    m2.delete();
                });
            });
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