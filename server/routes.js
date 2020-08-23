const processUrls = require('./controllers/url');
const redirectUrl = require('./controllers/index');
const allUrls = require('./controllers/table');

module.exports = (app) => {
    app.post('/url', processUrls.processUrls),
    app.get('/:code', redirectUrl.redirectUrl),
    app.get('/api/getUrls', allUrls.allUrls)
}