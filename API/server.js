const app = require('./index');
const config = require('./util/config');

app.listen(config.server.port, (err) => {
    if (err) throw err
    console.log('User Management Server running in http://' + config.server.host + ':' + config.server.port);
});