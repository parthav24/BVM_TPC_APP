import { Sequelize } from 'sequelize';
import { development } from './config.js';
const sequelize = new Sequelize(
    development.database,
    development.username,
    development.password,
    {
        port: development.port,
        host: development.host,
        dialect: development.dialect,
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
});

export default sequelize;
