const pg = require("pg");
const settings = require("./settings");

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

knex.select('first_name').from('famous_people')
      .asCallback(function(err, rows) {
        if (err) return console.error(err);
        console.log("result ",rows);
        knex.destroy();
      });
