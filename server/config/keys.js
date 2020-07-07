const dbPassword = 'mongodb+srv://test_user:' + encodeURIComponent('test_user') + '@clustersyed-bx7eu.mongodb.net/test?retryWrites=true';

module.exports = {
    mongoURI: dbPassword
};
