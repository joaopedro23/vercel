require('dotenv').config();
const postgres = require("postgres");




const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?option=project=${ENDPOINT_ID}`;


const sql = postgres(URL, { ssl: 'require' });
module.exports = { sql, URL };


