const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);
console.log('🔍 Database Config:', config);
module.exports = ({ env }) => ({
    connection: {
        client: 'postgres',
        connection: {
            host: config.host,
            port: config.port,
            database: config.database,
            user: config.user,
            password: config.password,
            ssl: env.bool('DATABASE_SSL', true),
        },
    },
});
