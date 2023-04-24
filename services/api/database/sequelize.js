import { Sequelize } from 'sequelize';
import SQLite from 'sqlite3';

const sequelize = new Sequelize('database', 'username', 'password', {
	dialect: 'sqlite',
	storage: 'database/database.db',
	dialectOptions: {
		// Your sqlite3 options here
		// for instance, this is how you can configure the database opening mode:
		mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
	},
});

export const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
