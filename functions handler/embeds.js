const { MessageEmbed } = require("discord.js");

module.exports = {
    succes_param: async function (sujet_param, user, colorC) {
        new MessageEmbed()
            .setTitle(sujet_param + 'à été configuré avec succès !')
            .setDescription('Vous venez de finaliser le paramètrage de ' + sujet_param)
            .setFooter(user + 'viens de configurer' + sujet_param)
            .setColor(colorC)
        ;
    }
}
