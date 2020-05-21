const fs = require('fs');
const path = require('path');

const { EMAIL_REGEX } = require('./../../../helpers/global.helper');
const { hashPassword } = require('./../../../helpers/utility.helper');

const users = require('./../../../data/users.json');

const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
}

const countEmail = async (email) => {
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/users.json'), 'utf8'));
    return users.filter(item => item.email === email).length ? 1 : 0;
};

const createUser = async (user) => {
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/users.json'), 'utf8'));
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    let userRecord = Object.assign({ id }, user);
    userRecord.email = userRecord.email.toLowerCase();
    userRecord.password = hashPassword(user.password);
    users.push(userRecord);
    fs.writeFileSync(path.join(__dirname, '../../../data/users.json'), JSON.stringify(users));
    delete userRecord.password;
    return userRecord;
};

module.exports = {
    validateEmail,
    countEmail,
    createUser
};