import { DataTypes } from 'sequelize';
import { db } from '../database/sequelize.js';

export const User = db.sequelize.define('User', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		set(value) {
			this.setDataValue('email', value.toLowerCase());
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	}
});
