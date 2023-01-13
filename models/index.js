/* Este archivo servirá poder trabajar con NoSQL o SQL */

const models = {

    // Mongoose
    usersModel: require('./nosql/Users'),
    tracksModel: require('./nosql/Tracks'),
    storageModel: require('./nosql/Storage')
};

module.exports = models;