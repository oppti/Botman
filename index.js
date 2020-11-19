let framework = require("webex-node-bot-framework");
const webhook = require("webex-node-bot-framework/webhook");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require("./config.json");

const TurndownService = require("turndown");
const turndownService = new TurndownService({ codeBlockStyle: "fenced", headingStyle: "atx", linkReferenceStyle: "collapsed" });

// Use python shell to run a python script from nodejs
const ps = require("python-shell");
const pythonBrowserScript = "./ccwBrowser.py";

let FUNC_query = require("./Views/CardSwitch/swController");
let card = require("./Views/CardSwitch/cardSwitch.json"); // start card Switch
let connection = require("./Database/database"); // start database

app.use(bodyParser.json());
app.use(express.static("images"));

framework = new framework(config);

config.restrictedToEmailDomains = "oppti.com.br,oppware.com";


// Start framework
framework.start();

// Set responded to false
let responded = false;

// Bot successfully started
framework.on("initialized", function() {
    console.log("Botman has successfully started!");
});

// DM the user who added bot to a group space
framework.on("spawn", function(bot, flintId, addedById) {
    if (!addedById) {
        framework.debug(`A estrutura gerou um objecto bot existente no espaco: ${bot.room.title}`);
    } else {
        if ((bot.room.type === "group") && (addedById)) {
            // Get the person details for the user who added the bot to the space
            bot.webex.people.get(addedById)
                .then((person) => bot.say(`Olá ${person.displayName}, Não estou habilitado para funcionar neste grupo.`))
                .then(() => bot.exit())
                .catch((e) => console.error(`Something went wrong in spawn handler when added to a group space: ${e.message}`))
        } else {
            console.error("Something went wrong");
        }
    }
})

framework.hears(/^\/anunciar 0PP0rtunity \/(test|all)/, function(bot, trigger) {
    responded = true;
    const type = trigger.message.html ? "html" : "text"
        // const firstLine = trigger.message.text.split("\n")[0]
        // const flag = firstLine.match(/^\/anunciar 0PP0rtunity \/(test|all)/)[1]
    const flag = trigger.message.text.split("\n")[0].match(/^\/anunciar 0PP0rtunity \/(test|all)/)[1]

    let botMessage;

    if (type === "text") {
        botMessage = trigger.message.text.replace(/^\/anunciar 0PP0rtunity \/(test|all).*?\n/, "")
    } else {
        console.log(trigger.message.html)
        botMessage = trigger.message.html.replace(/\/anunciar 0PP0rtunity \/(?:test|all).*?(<br\/>|<\/p>)/, "$1")
        botMessage = turndownService.turndown(botMessage)
        console.log(botMessage)
    }

    if (flag === "test") {
        bot.say('markdown', botMessage)
    } else {
        framework.bots.forEach(bot => {
            bot.say('markdown', botMessage)
        })

    }
});

framework.hears(/^\/switch(\s+?|$)/i, function(bot) { 
    responded = true;
    bot.sendCard(card, "Cartão switch");
});

framework.hears(/^\/serial(\s+?|$)/i, function(bot, trigger) {

    responded = true;

    let count = 0;
    let serialNumbers = [];

    let input = trigger.text;

    input = input.replace(/^\/serial(\s+)/i, "");
    input = input.replace(/[,;-]+/g, " ");
    input = input.replace(/\s{2,}/g, " ");

    input = input.split(" ");

    input.some(function(serial) {
        if (count === 5) {
            return true
        }

        if (serial.search(/^[A-Z]{3}\w{8}$/i) != -1) {
            if (serialNumbers.indexOf(serial) === -1) {
                serialNumbers.push(serial)
                    ++count
            }
        }
    })

    if (serialNumbers.length > 0) {

        if (serialNumbers.length === 1) {
            bot.say(`${trigger.person.firstName}, aguarde enquanto procuro informações sobre o serial number.\n`)
        } else {
            bot.say(`${trigger.person.firstName}, aguarde enquanto procuro informações sobre os serial numbers.\n`)
        };

        let options = {
            mode: "text",
            args: [serialNumbers.join(",")]
        };

        ps.PythonShell.run(pythonBrowserScript, options, function(err, results) {
            if (err) {
                console.error(err)
                bot.say("Ops! Algo deu errado")

            };
            results = results.join("\n");
            bot.say("markdown", results);
        });
    } else {
        bot.say("markdown", `\nSerial number não identificado. Digite um serial number válido.\n\nExemplo: /serial ASD758M5874`);
    };
});

framework.on("attachmentAction", function(bot, trigger) {
    let swCard = trigger.attachmentAction;

    const entp = FUNC_query.entrepQuery(swCard.inputs["enterprise"]);
    const small = FUNC_query.smallQuery(swCard.inputs["small"]);
    const datac = FUNC_query.dataQuery(swCard.inputs["datacenter"]);
    const cloud = FUNC_query.cloudQuery(swCard.inputs["cloud"]);
    const sfp_qtd = swCard.inputs["sfpqnt"];
    const ssfp = FUNC_query.sfpQuery(sfp_qtd);
    const gbt = FUNC_query.gbitQuery(swCard.inputs["velsfp"], sfp_qtd);
    const emp = FUNC_query.empQuery(swCard.inputs["emp"]);
    const poe = FUNC_query.poeQuery(swCard.inputs["poe"]);
    const rot = FUNC_query.rotQuery(swCard.inputs["routing"]);
    const font = FUNC_query.fontQuery(swCard.inputs["power"]);
    const port = FUNC_query.portQuery(swCard.inputs["qntutp"]);
    const velUtp = FUNC_query.velQuery(swCard.inputs["velutp"]);
    const mGig = FUNC_query.mGigQuery(swCard.inputs["mgig"]);
    const eos = FUNC_query.endOfSales(swCard.inputs["eosl"]);

    const CampoCat = [entp, small, datac, cloud];
    let CampoCat_query = []; // category  
    let queryItems = [];

    CampoCat.forEach((item) => {
        if (item != "") { // tira vazio 
            CampoCat_query.push(item)
        }
    })
    if (CampoCat_query.length > 0) {
        queryCategory = `familia.Classificacao IN (${CampoCat_query.join(",")})`
    } else {
        queryCategory = ""
    }

    const Campo = [port, ssfp, gbt, emp, poe, rot, font, velUtp, mGig, eos, queryCategory]

    Campo.forEach((item) => {
        if (item != "") {
            queryItems.push(item);
        }
    })

    if (queryItems.length > 0) {
        const queryParameters = queryItems.join(" and ");

        let query = `SELECT * FROM familia INNER JOIN switch ON switch.familia_id = familia.id where ${queryParameters} order by Portas`;

        connection.query(query, function(error, result) {
            if (error) {
                throw error;
            }

            const resultsCount = result.length

            let msgHeader = `${trigger.person.firstName}, encontrei ${resultsCount} resultados para sua busca.`
            let mensagem = "";
            const qnt = 15 // limit de retorno para o front end 
            if (resultsCount > qnt) {
                msgHeader += ` Mostrando os ${qnt} primeiros:`
                result = result.slice(0, qnt)
            }

            result.forEach((resultado) => {
                let modelo = resultado.Modelo;
                let url = resultado.Datasheet;
                let desc = resultado.Descricao;
                mensagem += `* [${modelo}](${url}):**${desc}**\n`
            });
            mensagem =
                mensagem != "" ?
                `${msgHeader}\n\n${mensagem}` :
                `${trigger.person.firstName}, não encontrei resultado referente a sua busca.`;
            bot.say("markdown", mensagem);
        });

    } else {
        bot.say("markdown", `${trigger.person.firstName}, necessário preencher ao menos um campo.`);
    }
});

framework.hears(/^\/(help|ajuda|\?)(\s+?|$)/i, function(bot) {
    sendHelp(bot)
    responded = true
});

framework.hears(/.*/, function(bot, trigger) {
    // This will fire for any input so only respond if we haven't already
    if (!responded) {
        bot.say(`Desculpe, ${trigger.person.firstName}. Não entendi o que você digitou: "${trigger.text}"`) // hello name, I'm sorry 
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
        `* **/help**\tMenu de informações.\n\n`,
        `* **/switch**\tChama o cartão switch.\n\n`,
        `* **/serial <serial>**\tMostra informações sobre o serial number. Você pode incluir até 5 serial numbers separados por virgula.`
    );
}
// listen
app.post("/", webhook(framework));
let server = app.listen(config.port, function() {
    framework.debug("framework listening on port %s", config.port);
});
