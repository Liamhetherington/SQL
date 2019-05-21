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


knex('famous_people')
.returning('first_name','last_name', 'birthdate')
.insert(
  {first_name: process.argv.slice(2)[0]},
  {last_name: process.argv.slice(2)[1]},
  {birthdate: process.argv.slice(2)[2]}
  )
  .asCallback(function(err, rows) {
        if (err) return console.error(err);
        rows.forEach((row, index) =>
        console.log("- " + (index + 1) + ": " + row.first_name
          + " " + row.last_name + ", born "

