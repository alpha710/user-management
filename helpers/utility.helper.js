const bcryptjs = require('bcryptjs');

const { SALT_ROUNDS } = require('./global.helper');

const hashPassword = (plainTextPassword) => {
    return bcryptjs.hashSync(plainTextPassword, bcryptjs.genSaltSync(SALT_ROUNDS));
};

const comparePassword = (plainTextPassword, hash) => {
    return bcryptjs.compareSync(plainTextPassword, hash);
};

module.exports = {
    hashPassword,
    comparePassword
};