import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
    uid: {
        type: DataTypes.STRING(7),
        primaryKey: true,
        validate:{
            len:[7,7]
        }
    },
    dept_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Department',
            key: 'dept_id',
        },
    },
    role: {
        type: DataTypes.ENUM('student', 'tpc'),
        allowNull: false,
    },
    f_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    m_name: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    l_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    mobile: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    passout_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false, // This line ensures that createdAt and updatedAt fields are added automatically
});

export default User;