// Express server used for testing the prod build

const express = require('express');
const expressStaticGzip = require('express-static-gzip');

const app = express();

app.use('/', expressStaticGzip(`${__dirname}/build`, { enableBrotli: true }));
app.use('/*', expressStaticGzip(`${__dirname}/build`, { enableBrotli: true }));

app.set('port', process.env.PORT || 5000);
app.set('ipaddress', process.env.IP_ADDRESS || '0.0.0.0');


app.listen(app.get('port'), app.get('ipaddress'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
});

module.exports = app;
