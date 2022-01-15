const { Permissions, MessageEmbed, MessageCollector, MessageActionRow, MessageButton } = require('discord.js');
const commandeFormat = 'add-role-btn';
const ALIAS = ['add-role-btn', 'ar', 'add-role-button', 'ar-button', 'add-btn', 'add-button'];
const COLOR = require('../../dbs/color-embeds.json');
const embeds = require('../../functions-handler/embeds');

module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] == args[0] || ALIAS.includes(args[0]));
};

/**
     *
     * @param {Discord.Message} msg
     */

module.exports.action = async (msg, args, client) => {
	if (commandeFormat.split(' ').length <= args.length) {
        // éxécuter le code
        const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';

        if(!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && msg.author.id !== '688098375697956905') {
            msg.delete();
            return msg.channel.send({ embeds: [embeds.erreur(msg, `Vous n'avez pas la permission d'utiliser cette commande !`)] });
        }

        msg.delete();
        const demande_button = await embeds.question(msg, `Quelle message voullez-vous mettre dans le boutton ?`, `Le contenu de votre message sera le contenu du boutton du rôle réaction.`)
        const collector_button_label = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
        collector_button_label.on('collect', async m => {
            m.delete();
            if(m.author == msg.author) {
                if(m.content.length > 80) {
                    embeds.erreur(msg, `Le message est trop long !`);
                    collector_button_label.stop();
                    return;
                } else {
                    embeds.success(msg, `Le message \`${m}\` a bien été ajouté au rôle-réaction !`);
                    collector_button_label.stop();
                    embeds.question(msg, `Quelle couleur voulez-vous ?`, `La couleur du boutton du rôle-réaction.\n\`bleu\`\n\`rouge\`\n\`vert\`\n\`gris\``)

                    const collector_button_color = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
                    collector_button_color.on('collect', async m_btn => {
                        if(m_btn.author == msg.author) {
                            if(m_btn.content === 'cancel') {
                                embeds.erreur(msg, `L'ajout du rôle-réaction a été annulé !`);
                                collector_button_color.stop();
                                return;
                            } else if (m_btn.content.toUpperCase() === 'BLEU' || m_btn.content.toUpperCase() === 'ROUGE' || m_btn.content.toUpperCase() === 'VERT' || m_btn.content.toUpperCase() === 'GRIS') {
                                const color_btn = m_btn.content.toUpperCase();
                                collector_button_color.stop();
                                embeds.success(msg, `La couleur \`${color_btn}\` a bien été ajouté au rôle-réaction !`);
                                embeds.question(msg, `Quelle rôle voulez-vous ?`, `Veuillez spécifier l'id du rôle.`)
                                const collector_button_role = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
                                collector_button_role.on('collect', async m_role => {
                                    if(msg.author.id === m_role.author.id) {
                                        if(m_role.content === 'cancel') {
                                            embeds.erreur(msg, `L'ajout du rôle-réaction a été annulé !`);
                                            collector_button_role.stop();
                                            return;
                                        }
                                        if(m_role.content.length > 18) {
                                            embeds.erreur(msg, `L'id du rôle est trop long !`);
                                            collector_button_role.stop();
                                            return;
                                        } else {
                                            const role = m_role.guild.roles.cache.find(r => r.id === m_role.content);
                                            if(!role) {
                                                embeds.erreur(msg, `Aucun rôle n'a été trouvé avec l'id \`${m_role.content}\``);
                                                collector_button_role.stop();
                                                return;
                                            } else {
                                                collector_button_role.stop();
                                                embeds.success(msg, `Le rôle \`${role.name}\` a bien été ajouté au rôle-réaction !`);
                                                embeds.question(msg, `Quelle est l'ID du message au quelle vous voullez ajouter un boutton ?`, `Le message doit avoir été envoyé par moi même afin de pouvoir y ajouter un boutton.`);
                                                const collector_id_msg = new MessageCollector(msg.channel, m_btn => m_btn.author.id === msg.author.id, { time: 60000 });
                                                collector_id_msg.on('collect', async m_id => {
                                                    if(msg.author != m_id.author) {
                                                        return;
                                                    }
                                                    if(msg.author.bot) return;
                                                    if (m_id.content === 'cancel') {
                                                        embeds.erreur(msg, `L'ajout du rôle-réaction a été annulé !`);
                                                        collector_id_msg.stop();
                                                        return;
                                                    } else {
                                                        if(m_id.content.length != 18) {
                                                            embeds.erreur(msg, `ce n'est pas l'id d'un message !`);
                                                            collector_id_msg.stop();
                                                            return;
                                                        } else {

                                                            const m_id_msg = m_id.channel.messages.fetch(m_id.content);
                                                            if((await m_id_msg).author.id === client.user.id) {
                                                                let clr = ''
                                                                if(color_btn === 'BLEU') {
                                                                    clr = 'PRIMARY'
                                                                }
                                                                if(color_btn === 'VERT') {
                                                                    clr = 'SUCCESS'
                                                                }
                                                                if(color_btn === 'ROUGE') {
                                                                    clr = 'DANGER'
                                                                }
                                                                if(color_btn === 'GRIS') {
                                                                    clr = 'SECONDARY'
                                                                }
                                                                const row = new MessageActionRow()
                                                                .addComponents(
                                                                    new MessageButton()
                                                                        .setCustomId(`rolereact-${role.id}`)
                                                                        .setLabel(`${m}`)
                                                                        .setStyle(`${clr}`),
                                                                );
                                                                (await m_id_msg).edit({ components: [row]})
                                                                embeds.success(msg, `Le rôle-réaction a bien été ajouté !`);
                                                                collector_id_msg.stop();
                                                            } else {
                                                                embeds.erreur(msg, `L'ID du message n'est pas valide ou l'auteur du message n'est pas moi-même !`);
                                                                collector_id_msg.stop();
                                                                return;
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                })
                            } else {
                                embeds.erreur(msg, `La couleur n'est pas valide !`);
                                collector_button_color.stop();
                                return;
                            }
                        }
                    });

                }
            }
        });

    }

	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};