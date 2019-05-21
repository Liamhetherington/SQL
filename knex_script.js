const knex = require("knex");
const settings = require("./settings");

const client = new knex.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let name =process.argv.slice(2)[0];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

 client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [name],
    (err, result) => {
    if (err) {
    return console.error("error running query", err);
    }
    result.rows.forEach(row =>
      console.log(row.first_name + " " + row.last_name + ", born " + row.birthdate.toLocaleDateString()));
    client.end();
  })
});