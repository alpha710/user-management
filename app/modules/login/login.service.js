const fs = require('fs');
const path = require('path');

const { comparePassword } = require('./../../../helpers/utility.helper');

const findUser = async (email) => {
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/users.json'), 'utf8'));
    const filteredUsers = users.filter(item => item.email === email);
    return filteredUsers.length ? filteredUsers[0] : null;
};

const validatePassword = (plainTextPassword, hash) => {
    return comparePassword(plainTextPassword, hash);
};

module.exports = {
    findUser,
    validatePassword
};