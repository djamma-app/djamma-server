import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const database = process.env.DATABASE || 'djamma';
const username = process.env.USERNAME || 'djamma';
const password = process.env.PASSWORD || 'djamma';
const host = process.env.DATABASE_HOST || 'localhost';
const basename = path.basename(module.filename);

const db = {};

function init() {
  const sequelize = new Sequelize(database, username, password, {
    host,
    dialect          : 'mysql',
    logging          : false,
    operatorsAliases : false,
  });

  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('triggers') === -1
      );
    })
    .forEach(function(file) {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  db.sequelize = sequelize;
}

db.init = init;
db.Sequelize = Sequelize;

module.exports = db;
