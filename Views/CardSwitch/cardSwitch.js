let CardSW = {
    "type": "AdaptiveCard",
    "body": [{
            "type": "ColumnSet",
            "columns": [{
                    "type": "Column",
                    "width": "stretch",
                    "items": [{
                            "type": "TextBlock",
                            "text": "Switch Selector",
                            "horizontalAlignment": "Left",
                            "color": "Accent",
                            "size": "Large",
                            "wrap": true
                        },
                        {
                            "type": "TextBlock",
                            "text": "Preencha os campos abaixo:",
                            "spacing": "Small",
                            "size": "Small",
                            "color": "Light",
                            "wrap": true,
                            "weight": "Lighter"
                        }
                    ]
                },
                {
                    "type": "Column",
                    "width": "stretch",
                    "items": [{
                        "type": "Image",
                        "url": "https://oppti.com.br/files/2019/10/Opportunity-Tecnologia-RGB.png",
                        "horizontalAlignment": "Right",
                        "size": "Large"
                    }]
                }
            ]
        },
        {
            "type": "TextBlock",
            "text": "**Quantidade de portas**",
            "spacing": "ExtraLarge",
            "size": "Small"
        },
        {
            "type": "Input.Number",
            "id": "portas",
            "spacing": "Small"
        },
        {
            "type": "TextBlock",
            "text": "**Quantidade de portas SFP**",
            "size": "Small"
        },
        {
            "type": "Input.ChoiceSet",
            "id": "sfp_qtd",
            "value": "vazio",
            "choices": [{
                    "title": " ",
                    "value": "vazio"
                },
                {
                    "title": "0",
                    "value": "0"
                },
                {
                    "title": "2",
                    "value": "2"
                },
                {
                    "title": "4",
                    "value": "4"
                },
                {
                    "title": "Mais do que 4",
                    "value": "5"
                }
            ],
            "spacing": "Small"
        },
        {
            "type": "TextBlock",
            "text": "**Velocidade das portas SFP em Gigabits**",
            "wrap": true,
            "size": "Small"
        },
        {
            "type": "Input.ChoiceSet",
            "id": "sfp_vel",
            "value": "vazio",
            "choices": [{
                    "title": " ",
                    "value": "vazio"
                },
                {
                    "title": "1",
                    "value": "1"
                },
                {
                    "title": "10",
                    "value": "10"
                },
                {
                    "title": "25",
                    "value": "25"
                },
                {
                    "title": "40",
                    "value": "40"
                },
                {
                    "title": "100",
                    "value": "100"
                }
            ],
            "spacing": "Small"
        },
        {
            "type": "TextBlock",
            "text": "**Roteamento (Layer 3)**",
            "wrap": true,
            "size": "Small"
        },
        {
            "type": "Input.ChoiceSet",
            "value": "vazio",
            "id": "rott",
            "choices": [{
                    "title": " ",
                    "value": "vazio"
                },
                {
                    "title": "Sim",
                    "value": "sim"
                },
                {
                    "title": "Não",
                    "value": "nao"
                }
            ],
            "spacing": "Small"
        },
        {
            "type": "TextBlock",
            "text": "**Fonte redundante**",
            "wrap": true,
            "size": "Small"
        },
        {
            "type": "Input.ChoiceSet",
            "value": "vazio",
            "id": "fonte",
            "choices": [{
                    "title": " ",
                    "value": "vazio"
                },
                {
                    "title": "Sim",
                    "value": "sim"
                },
                {
                    "title": "Não",
                    "value": "nao"
                }
            ],
            "spacing": "Small"
        },
        {
            "type": "TextBlock",
            "text": "**Empilhamento**",
            "wrap": true,
            "size": "Small"
        },
        {
            "type": "Input.ChoiceSet",
            "value": "vazio",
            "id": "emp",
            "choices": [{
                    "title": " ",
                    "value": "vazio"
                },
                {
                    "title": "Sim",
                    "value": "sim"
                },
                {
                    "title": "Não",
                    "value": "nao"
                }
            ],
            "spacing": "Small"
        },
        {
            "type": "TextBlock",
            "text": "**Power over Ethernet (PoE)**",
            "size": "Small"
        },
        {
            "type": "Input.ChoiceSet",
            "id": "poe",
            "value": "vazio",
            "choices": [{
                    "title": " ",
                    "value": "vazio"
                },
                {
                    "title": "Sim",
                    "value": "sim"
                },
                {
                    "title": "Não",
                    "value": "nao"
                }
            ],
            "spacing": "Small"
        },
        {
            "type": "ActionSet",
            "actions": [{
                "type": "Action.Submit",
                "title": "Enviar"
            }],
            "spacing": "Small",
            "horizontalAlignment": "Left",
            "height": "stretch"
        },
        {
            "type": "TextBlock",
            "text": "_Precisa de ajuda? Entre em contato com o [suporte](mailto:suporte@oppti.com.br?subject=Botman)._",
            "size": "Small",
            "spacing": "Large",
            "horizontalAlignment": "Left",
            "height": "stretch",
            "color": "Light",
            "weight": "Lighter"
        }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.2"
}

module.exports = CardSW;