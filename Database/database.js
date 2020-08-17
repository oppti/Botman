var mysql = require("mysql");
const connection = mysql.createConnection({
    host: '192.168.0.72',
    user: 'root',
    password: 'root',
    database: 'Prevendas'
        // host: 'localhost',
        // user: 'root',
        // password: '1234',
        // database: 'Prevendas'

});
connection.connect(function(error) {
    if (error) {
        console.log("falha ao conectar no mysql:" + error);
    } else {
        console.log("MYSQL conectado com sucesso ");
    }
});

module.exports = connection