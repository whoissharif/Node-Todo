const moment = require('moment');

// @returns a random number by given length - Author: Istiaq Hasan
const numRand = (length) => {
    let result = [];
    let characters = '0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}

// @returns a random string by given length - Author: Istiaq Hasan
const stringRand = (length) => {
    let result = [];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}

// @makes a token to use for multiple synced databases for one system
const makeToken = (v) => {
    let token = stringRand(4) + numRand(2) + v.label + unixMS() + stringRand(2) + numRand(2);
    return token;
}

// @return UNIX milliseconds requires moment js - Author: Istiaq Hasan
const unixMS = () => {
    return moment().format('x');
}

module.exports = { numRand, stringRand, makeToken, unixMS }