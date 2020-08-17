var framework = require("webex-node-bot-framework");
var webhook = require("webex-node-bot-framework/webhook");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.use(express.static("images"));
var FUNC_query = require("./Views/CardSwitch/swController");
const config = require("./config.json");
var card = require("./Views/CardSwitch/cardSwitch"); // start card Switch
var connection = require("./Database/database"); // start database
var framework = new framework(config);
framework.start();
responded = false;
console.log("Starting framework, please wait...");
framework.on("initialized", function() {
    console.log("Chat iniciado com sucesso! [Press CTRL-C Para sair]");
});

framework.hears(/^\/Switch/i, function(bot) {
    console.log("Voce chamou o switch!");
    responded = true;
    bot.sendCard(card, "Cartão switch");
});

framework.on("attachmentAction", function(bot, trigger) {
    let swCard = trigger.attachmentAction;
    //  console.log(JSON.stringify(card, null, 2), "informações do ");
    const sfp_qtd = swCard.inputs["sfp_qtd"];


    const sfp = FUNC_query.sfp_Query(sfp_qtd);
    const gbt = FUNC_query.GBT_Query(swCard.inputs["sfp_vel"], sfp_qtd);
    const emp = FUNC_query.EMP_Query(swCard.inputs["emp"]);
    const poe = FUNC_query.POE_Query(swCard.inputs["poe"]);
    const rot = FUNC_query.ROT_Query(swCard.inputs["rott"]);
    const font = FUNC_query.FONT_Query(swCard.inputs["fonte"]);
    const port = FUNC_query.PORT_Query(swCard.inputs["portas"]);

    let Campo = [sfp, gbt, emp, poe, rot, font, port];
    var queryItems = [];

    Campo.forEach((item) => {
        if (item != "") {
            queryItems.push(item);
        }
    });

    if (queryItems.length > 0) {
        const queryParameters = queryItems.join(" and ");
        var query = `SELECT * FROM familia INNER JOIN switch ON switch.familia_id = familia.id where  ${queryParameters} LIMIT 20 `;

        connection.query(query, function(error, result) {
            if (error) {
                throw error;
            }
            var RespostaSW = "";
            var TAM = result.length;
            result.forEach((resultado) => {
                var modelo = resultado.Modelo;
                var url = resultado.Datasheet;
                var desc = resultado.Descricao;
                RespostaSW += `* [${modelo}](${url})  : **${desc}**\n`;
            });
            var rend;
            rend =
                RespostaSW != "" ?
                `Encontramos **${TAM}** resultados de modelos: \n\n  ${RespostaSW}` :
                "**Não econtramos resultado referente a sua busca. Vamos tentar novamente!  Em que posso lhe ajudar?**";
            bot.say("markdown", rend);

        });
    } else {
        bot.say("markdown", " **É necessario preencher ao menos um campo.** ");
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
        console.log(`catch-all handler fired for user input: ${trigger.text}`);
        bot.say(`Desculpa, não entendi o que você digitou: "${trigger.text}"`)
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
        `* **/switch**\tchama cartão switch. `
    );
}
// listen
app.post("/", webhook(framework));

var server = app.listen(config.port, function() {
    framework.debug("framework listening on port %s", config.port);
});