function sfpQuery(sfp_Campo) {
    if (sfp_Campo == "5") {
        sfp_query = "SFP >= 5 ";

    } else if (sfp_Campo == "vazio") {
        sfp_query = "";
    } else {
        sfp_query = `SFP=${sfp_Campo}`;
    }
    return sfp_query;
}

function gbitQuery(GBT, sfp_Campo) {
    if (sfp_Campo == "0") {
        GBT = "";
    } else if (GBT == "vazio") {
        GBT = "";
    } else {
        GBT = ` SFP_${GBT}Gb > 0 `;
    }
    return GBT;
}

function velQuery(VELPORT) {
    if (VELPORT == "vazio") {

        velPortQuery = "";

    } else {
        velPortQuery = `UTP_${VELPORT}Gb `;

    }
    return velPortQuery;
}

function empQuery(EMP) {
    if (EMP === "true") {
        EMP_query = `Empilhamento > 0 `;
    } else {
        EMP_query = "";
    }
    return EMP_query;
}

function poeQuery(POE) {
    if (POE === "true") {
        POE_query = `Watts_PoE > 0 `;
    } else {
        POE_query = "";
    }
    return POE_query;
}

function mGigQuery(mGig) {
    if (mGig === "true") {
        mgQuery = `mGig > 0`

    } else {
        mgQuery = ""
    }
    return mgQuery
}

function endOfSales(eos) {
    if (eos === "true") {
        eosQuery = `End_Of_Sales = 'VERDADEIRO'`
    } else {
        eosQuery = ""
    }
    return eosQuery
}

function rotQuery(ROT) {
    if (ROT === "true") {
        ROT_query = `Roteamento = 'sim' `
    } else {
        ROT_query = "";
    }
    return ROT_query;
}

function fontQuery(FONT) {
    if (FONT === "true") {
        FONT_query = `Fonte_Redudante = 'sim' `;
    } else {
        FONT_query = "" // sim   

    }
    return FONT_query;
}

function portQuery(PORTUTP) {
    if (PORTUTP != "") {
        PORT_query = `Portas >= ${PORTUTP}`; // 0    
    } else {
        PORT_query = "";
    }
    return PORT_query;
}

function entrepQuery(entp) {
    if (entp === "true") {
        entCatQuery = `"Enterprise"`
    } else {
        entCatQuery = ""
    }
    return entCatQuery
}

function smallQuery(small) {
    if (small === "true") {
        smallCatQuery = `"SMB"`
    } else {
        smallCatQuery = ""
    }
    return smallCatQuery
}

function dataQuery(datac) {
    if (datac === "true") {
        dataCatQuery = `"Datacenter"`
    } else {
        dataCatQuery = ""
    }
    return dataCatQuery
}

function cloudQuery(cloud) {
    if (cloud === "true") {
        cloudCatQuery = `"Cloud" `
    } else {
        cloudCatQuery = ""
    }
    return cloudCatQuery
}



module.exports = {
    portQuery,
    poeQuery,
    fontQuery,
    empQuery,
    rotQuery,
    sfpQuery,
    velQuery,
    gbitQuery,
    entrepQuery,
    smallQuery,
    dataQuery,
    cloudQuery,
    mGigQuery,
    endOfSales,
};