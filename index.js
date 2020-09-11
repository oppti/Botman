var framework = require("webex-node-bot-framework");
var webhook = require("webex-node-bot-framework/webhook");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.use(express.static("images"));
const config = require("./config.json");


var FUNC_query = require("./Views/CardSwitch/swController");
var card = require("./Views/CardSwitch/cardSwitch.json"); // start card Switch
var connection = require("./Database/database"); // start database
var framework = new framework(config);
config.restrictedToEmailDomains = 'oppti.com.br,oppware.com'
framework.start();
responded = false;
console.log("Starting framework, please wait...");
framework.on("initialized", function() {
    console.log(`Chat iniciado com sucesso![Press CTRL-C Para sair]`);
});
// DM the user who added bot to a group space
framework.on('spawn', function(bot, flintId, addedById) {
    if (!addedById) {
        framework.debug(`A estrutura gerou um objecto bot existente no espaco: ${bot.room.title}`);
    } else {
        if ((bot.room.type === 'group') && (addedById)) {
            // Get the person details for the user who added the bot to the space
            bot.webex.people.get(addedById)
                .then((person) => bot.say(`Olá ${person.displayName}, Não estou habilitado para funcionar neste grupo.`))
                .then(() => bot.exit())
                .catch((e) => console.error(`Something went wrong in spawn handler when added to a group space: ${e.message}`))
        } else {
            console.log('algo deu errado ')
        }
    }
})
framework.hears(/^\/switch/i, function(bot) {
    responded = true;
    bot.sendCard(card, "Cartão switch");
});
framework.on("attachmentAction", function(bot, trigger) {
    let swCard = trigger.attachmentAction;
    const entp = FUNC_query.entrepQuery(swCard.inputs['enterprise'])
    const small = FUNC_query.smallQuery(swCard.inputs['small'])
    const datac = FUNC_query.dataQuery(swCard.inputs["datacenter"])
    const cloud = FUNC_query.cloudQuery(swCard.inputs["cloud"])
    const sfp_qtd = swCard.inputs["sfpqnt"];
    const ssfp = FUNC_query.sfpQuery(sfp_qtd);
    const gbt = FUNC_query.gbitQuery(swCard.inputs["velsfp"], sfp_qtd);
    const emp = FUNC_query.empQuery(swCard.inputs["emp"]);
    const poe = FUNC_query.poeQuery(swCard.inputs["poe"]);
    const rot = FUNC_query.rotQuery(swCard.inputs["routing"]);
    const font = FUNC_query.fontQuery(swCard.inputs["power"]);
    const port = FUNC_query.portQuery(swCard.inputs["qntutp"]);
    const velUtp = FUNC_query.velQuery(swCard.inputs["velutp"])
    const mGig = FUNC_query.mGigQuery(swCard.inputs["mgig"])
    const eos = FUNC_query.endOfSales(swCard.inputs["eosl"])
    let CampoCat = [entp, small, datac, cloud];
    var CampoCat_query = [] // category  
    var queryItems = [];
    console.log(trigger)
    CampoCat.forEach((items) => {
        if (items != "") { // tira vazio 
            CampoCat_query.push(items)
        }
    })
    if (CampoCat_query.length > 0) {
        queryCategory = `familia.Classificacao IN (${CampoCat_query.join(",")})`
    } else {
        queryCategory = ""
    }
    let Campo = [port, ssfp, gbt, emp, poe, rot, font, velUtp, mGig, eos, queryCategory]
    Campo.forEach((item) => {
        if (item != "") {
            queryItems.push(item);
        }
    })
    if (queryItems.length > 0) {
        const queryParameters = queryItems.join(" and ");
        var query = `SELECT * FROM familia INNER JOIN switch ON switch.familia_id = familia.id where ${queryParameters} order by Portas`;
        console.log(query)
        connection.query(query, function(error, result) {
            if (error) {
                throw error;
            }
            const resultsCount = result.length

            let msgHeader = `${trigger.person.firstName}, encontrei ${resultsCount} resultados para sua busca.`
            var RespostaSW = "";
            var qnt = 15 // limit de retorno para o front end 
            if (resultsCount > qnt) {
                msgHeader += ` Mostrando os ${qnt} primeiros:`
                result = result.slice(0, qnt)
            }
            result.forEach((resultado) => {
                var modelo = resultado.Modelo;
                var url = resultado.Datasheet;
                var desc = resultado.Descricao;
                RespostaSW += `* [${modelo}](${url}):**${desc}**\n`
            });
            var rend;
            rend =
                RespostaSW != "" ?
                `${msgHeader}\n\n${RespostaSW}` :
                `${trigger.person.firstName}, Não encontrei resultado referente a sua busca. Vamos tentar novamente!  Em que posso lhe ajudar?`;
            bot.say("markdown", rend);
        });

    } else {
        bot.say("markdown", `${trigger.person.firstName}, é necessário preencher ao menos um campo.`);
    }
});
framework.hears(/^\/(help|ajuda|\?)/i, function(bot) {

        sendHelp(bot)
        responded = true
    })
    // fim card input

framework.hears(/.*/, function(bot, trigger) {
    // This will fire for any input so only respond if we haven't already
    if (!responded) {
        bot.say(`Desculpa ${trigger.person.firstName}, não entendi o que você digitou: "${trigger.text}"`) // hello name, I'm sorry 
            .then(() => sendHelp(bot))
            .catch((e) =>
                console.error(
                    `Problem in the unexepected command hander: ${e.message}`
                )
            );
    }
    responded = false;
});

function sendHelp(bot) {
    bot.say(
        "markdown",
        `Estes são os comandos que posso responder:\n\n`,
        `*  **/help** \tMenu de informações. \n\n`,
        `* **/switch**\tchama cartão switch.`
    );
}
// listen
app.post("/", webhook(framework));
var server = app.listen(config.port, function() {
    framework.debug("framework listening on port %s", config.port);
});