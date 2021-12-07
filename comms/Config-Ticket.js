const { Permissions, MessageEmbed, MessageCollector, MessageActionRow, MessageButton } = require('discord.js');
const commandeFormat = 'adminticket';
const ALIAS = ['config-ticket', 'ticket-config'];
const COLOR = require('../dbs/color-embeds.json');
const message_ticket = require('../dbs/ticket-message.json')
const fs = require('fs')

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
		// executer le code
        const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
        const embeds = require('../functions-handler/embeds')
		const nperm = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !');
		if (!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return embeds.erreur(msg, 'Vous n\'avez pas la permission d\'utiliser cette commande !' )
		const question = await embeds.question(msg, 'Veuillez choisir une option', `> \`message\` => Configure le message sur le quelle sera joint le boutton permettant d'ouvrire un ticket.
        > \`cancel\` => Annuler la commande`)

        const collector = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
		collector.on('collect', async message => {
            if( message.author.bot ) return
            if(message.content === 'message' || msg.content === 'cancel') {
                if(message.content.toLocaleLowerCase() === 'cancel') {
                    embeds.cancel();
                    collector.stop();
                    question.delete();
                }
                if(message.content.toLocaleLowerCase() === 'message') {
                    question.delete();
                    collector.stop();
                    await message.channel.bulkDelete(2);
                    const question_title = new MessageEmbed()
                        .setTitle('Configuration Ticket')
                        .setDescription('Quelle titre voullez-vous donner au message permetant l\'ouverture des tickets ?')
                        .addField('> \`cancel\`', 'Annuler la commande')
                        .setFooter('Commande de configuration des tickets')
                        .setColor(colorC)
                    ;
                    msg.channel.send( { embeds: [question_title] } )

                    let Title_Message = ''
                    const collector1 = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
                    collector1.on('collect', async message1 => {
                        if( message1.author.bot ) return
                        if(message1.content.length > 250) {
                            embeds.erreur(message1, 'Votre message est trop long. Un titre ne peut pas contenir plus de 250 caractères !')
                            return;
                        } else {
                            Title_Message = message1.content
                            collector1.stop();
                            await message.channel.bulkDelete(2);
                            const question_description = new MessageEmbed()
                                .setTitle('Configuration Ticket')
                                .setDescription('Quelle description voullez-vous donner au message permetant l\'ouverture des tickets ?')
                                .addField('> \`cancel\`', 'Annuler la commande')
                                .setFooter('Commande de configuration des tickets')
                                .setColor(colorC)
                            ;
                            let description_Message = ''
                            msg.channel.send( { embeds: [question_description] } )
                            const collector2 = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
                            collector2.on('collect', async message2 => {
                                if( message2.author.bot ) return
                                if(message2.content > 4096) {
                                    embeds.erreur(message2, 'Votre message est trop long. Une description ne peut pas contenir plus de 250 caractères !')
                                    return;
                                } else {
                                    description_Message = message2.content
                                    
                                    await message2.channel.bulkDelete(2);
                                    collector2.stop();
                                    const question_button = new MessageEmbed()
                                        .setTitle('Configuration Ticket')
                                        .setDescription('Quelle message voullez-vous donner au boutton permetant l\'ouverture des tickets ?')
                                        .addField('> \`cancel\`', 'Annuler la commande')
                                        .setFooter('Commande de configuration des tickets')
                                        .setColor(colorC)
                                    ;
                                    let button_message = ''
                                    msg.channel.send( { embeds: [question_button] } )
                                    
                                    const collector3 = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
                                    collector3.on('collect', async message3 => {
                                        if( message3.author.bot ) return
                                        if(message3.content <= 10) {
                                            embeds.erreur(message3, 'Votre message est trop long. Un boutton ne peut pas contenir plus de 10 caractères !')
                                            return;
                                        } else {
                                            button_message = message3.content
                                            
                                            await message3.channel.bulkDelete(2); 
                                            collector3.stop();
                                            const question_message_into_ticket = new MessageEmbed()
                                                .setTitle('Configuration Ticket')
                                                .setDescription(`Quelle message voullez-vous règler pour l'ouverture des ticket ?\nPar défaut \`\`\`${msg.member.user.username}, n'hésitez pas à dire au staff le sujet de ce ticket \:wink:\`\`\``)
                                                .addField('> \`cancel\`', 'Anuler la commande')
                                                .setColor(colorC)
                                            ;
                                            
                                            msg.channel.send({ embeds: [question_message_into_ticket] })
                                                const collector4 = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
                                                collector4.on('collect', async message4 => {
                                                    if(message4.author.bot) return;
                                                    if(message4.content.toLocaleLowerCase === 'cancel') {
                                                        return embeds.cancel()
                                                    } else {
                                                        const message_into_ticket = message4.content
                                                        if (message_ticket['message'][message4.guild.id]) {
                                                            delete (message_ticket['message'][message4.guild.id]);
                                        
                                                            message_ticket['message'][message4.guild.id] = {};
                                                            message_ticket['message'][message4.guild.id] = {
                                                                message_into_ticket,
                                                            };
                                                        }
                                                        else {
                                                            message_ticket['message'][message4.guild.id] = {};
                                                            message_ticket['message'][message4.guild.id] = {
                                                                message_into_ticket,
                                                            };
                                                        }
                                                        fs.writeFileSync('./dbs/ticket-message.json', JSON.stringify(message_ticket));
                                                        collector4.stop();
                                                        message.channel.bulkDelete(2);

                                                        const question_button = new MessageEmbed()
                                                            .setTitle('Configuration Ticket')
                                                            .setDescription('Quelle couleur voullez-vous donner au boutton permetant l\'ouverture des tickets ?')
                                                            .addField('> \`rouge\`', 'Configurer le couleur du bouton en Rouge')
                                                            .addField('> \`vert\`', 'Configurer le couleur du bouton en Vert')
                                                            .addField('> \`bleu\`', 'Configurer le couleur du bouton en Bleu')
                                                            .addField('> \`gris\`', 'Configurer le couleur du bouton en Gris')
                                                            .setFooter('Commande de configuration des tickets')
                                                            .addField('> \`cancel\`', 'Annuler la commande')
                                                            .setColor(colorC)
                                                            ;
                                                        msg.channel.send( { embeds: [question_button] } )
                                                        const collector5 = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
                                                        collector5.on('collect', async message5 => {
                                                        if( message5.author.bot ) return
                                                        const contentt = message5.content.toLocaleLowerCase()
                                                        if(contentt === 'rouge' || contentt === 'vert' || contentt === 'bleu' || contentt=== 'gris' || contentt === 'cancel') {
                                                            if(contentt === 'rouge') {
                                                                const button_color = 'DANGER'
                                                                
                                                                await message5.channel.bulkDelete(2);
                                                                const embeds_message = new MessageEmbed()
                                                                    .setTitle(Title_Message)
                                                                    .setDescription(description_Message)
                                                                    .setColor(colorC)
                                                                ;
                                                                const row = new MessageActionRow()
                                                                    .addComponents(
                                                                        new MessageButton()
                                                                            .setCustomId('ticket')
                                                                            .setLabel(button_message)
                                                                            .setStyle(button_color),
                                                                    );
                                                                message5.channel.send( { embeds: [embeds_message], components: [row] } )
                                                                collector5.stop();
                                                                
                                                            }
                                                            if(contentt === 'vert') {
                                                                const button_color = 'SUCCESS'
                                                                
                                                                await message5.channel.bulkDelete(2);
                                                                const embeds_message = new MessageEmbed()
                                                                    .setTitle(Title_Message)
                                                                    .setDescription(description_Message)
                                                                    .setColor(colorC)
                                                                ;
                                                                const row = new MessageActionRow()
                                                                    .addComponents(
                                                                        new MessageButton()
                                                                            .setCustomId('ticket')
                                                                            .setLabel(button_message)
                                                                            .setStyle(button_color),
                                                                    );
                                                                    message5.channel.send( { embeds: [embeds_message], components: [row] } )
                                                                    collector5.stop();
                                                            } else if (contentt === 'bleu') {
                                                                const button_color = 'PRIMARY'
                                                                
                                                                await message5.channel.bulkDelete(2);
                                                                const embeds_message = new MessageEmbed()
                                                                    .setTitle(Title_Message)
                                                                    .setDescription(description_Message)
                                                                    .setColor(colorC)
                                                                ;
                                                                const row = new MessageActionRow()
                                                                    .addComponents(
                                                                        new MessageButton()
                                                                            .setCustomId('ticket')
                                                                            .setLabel(button_message)
                                                                            .setStyle(button_color),
                                                                    );
                                                                    message5.channel.send( { embeds: [embeds_message], components: [row] } )
                                                                    collector5.stop();
                                                            } else if (contentt === 'gris') {
                                                                const button_color = 'SECONDARY'
                                                                
                                                                await message5.channel.bulkDelete(2);
                                                                const embeds_message = new MessageEmbed()
                                                                    .setTitle(Title_Message)
                                                                    .setDescription(description_Message)
                                                                    .setColor(colorC)
                                                                ;
                                                                const row = new MessageActionRow()
                                                                    .addComponents(
                                                                        new MessageButton()
                                                                            .setCustomId('ticket')
                                                                            .setLabel(button_message)
                                                                            .setStyle(button_color),
                                                                    ); 
                                                                msg.channel.send( { embeds: [embeds_message], components: [row] } )
                                                                collector5.stop();
                                                            } else if (message5.content.toLocaleLowerCase === 'cancel') {
                                                                embeds.cancel()
                                                            } else {
                                                                embeds.erreur(message5, 'La couleur séléctionée n\'est pas disponnible ! veuillez séléctioner une des couleurs proposés')
                                                                return;
                                                            }
                                                    }
                                                })
                                            }  
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }}
        })
    } else {
        msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
    }
};




/**/