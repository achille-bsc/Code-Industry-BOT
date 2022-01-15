const { MessageEmbed } = require("discord.js");
const fs = require('fs')

const commandeFormat = 'setadmin [member_id]';
const COLOR = require('../dbs/color-embeds.json');

const admin_db = require('../dbs/admins.json');

module.exports.check = (args, msg) => {
    return commandeFormat.split(' ')[0] == args[0];
};

/**
 *
 * @param {Discord.Message} msg
 */
module.exports.action = (msg, args) => {
    if (commandeFormat.split(' ').length <= args.length) {
        console.log(`[ADMIN][${commandeFormat}] => { ${msg.author.tag} (${msg.author.id}) }`)
        // executer le code
        const ever_admin = new MessageEmbed()
            .setTitle('Erreur !')
            .setDescription(`L'utilisateur que vous essayer de passer ADMINISTRATEUR l'est déjà !`)
        ;
        if (admin_db.admins.includes(args[1])) {
            msg.author.send({ embeds: [ever_admin] });
        } else {
            admin_db.admins.push(args[1]);
            fs.writeFileSync('./dbs/admins.json', JSON.stringify(admin_db))
            const success = new MessageEmbed()
                .setTitle('Succès !')
                .setDescription(`L'utilisateur <@${args[1]}> à été ajouté comme administrateur du bot !`)
            ;
            msg.author.send({ embeds: [success] })
        }
    }
    else {
        msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
    }
};