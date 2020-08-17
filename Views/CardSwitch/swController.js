function sfp_Query(sfp_Campo) {
    if (sfp_Campo == "5") {

        sfp_query = ">= 5 "

        sfp_query = "SFP >= 5 "

    } else
    if (sfp_Campo == "vazio") {
        sfp_query = ""
    } else {
        sfp_query = `= ${sfp_Campo}`

        sfp_query = `SFP = ${sfp_Campo}`
    }
    return sfp_query
}

function GBT_Query(GBT, sfp_Campo) {
    if (sfp_Campo == "0") {

        GBT = ""

    } else if (GBT == "") {
        GBT = ""
    } else if (GBT == "vazio") {
        GBT = ""
    } else {
        GBT = ` SFP_${GBT}Gb != 0 `
    }
    return GBT
}

function EMP_Query(EMP) {
    if (EMP == "sim") {
        EMP_query = ` Empilhamento != 0 `

    } else if (EMP == "nao") {
        var EMP_query = `Empilhamento = 0 `
    } else if (EMP == "vazio") {
        EMP_query = ""
    };
    return EMP_query;
}

function POE_Query(POE) {
    if (POE == "sim") {
        POE_query = `Watts_PoE != 0 `
    } else if (POE == "nao") {
        POE_query = `Watts_PoE = 0`
    } else if (POE == "vazio") {
        POE_query = ""
    };
    return POE_query
}

function ROT_Query(ROT) {
    if (ROT == "sim") {
        ROT_query = `Roteamento = 'sim' `
    } else if (ROT == "nao") {
        ROT_query = `Roteamento = 'nao' `
            //   ROT_query = `Roteamento = 'sim'`
    } else if (ROT == "nao") {
        ROT_query = `Roteamento = 'nao'`
    } else if (ROT == "vazio") {
        ROT_query = ""
    }
    return ROT_query
}

function FONT_Query(FONT) {
    if (FONT == "sim") {
        FONT_query = `Fonte_Redudante = 'sim' `
    } else if (FONT == "nao") {
        FONT_query = `Fonte_Redudante = 'nao' `
    } else if (FONT == "vazio") {
        FONT_query = ""
    };
    return FONT_query
}

function PORT_Query(PORT) {
    if (PORT != '') {
        PORT_query = `Portas = ${PORT}`
    } else {
        PORT_query = ''
    }
    return PORT_query

}

module.exports = { PORT_Query, POE_Query, FONT_Query, EMP_Query, ROT_Query, sfp_Query, GBT_Query }