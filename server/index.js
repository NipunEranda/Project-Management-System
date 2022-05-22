const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const app = express();
const routes = require('./routes');
const config = require('./util/config');

const userService = require('./services/user.service');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());

//Routes
routes.forEach(r => { app.use(r.path, r.module) });

async function scheduler() {
    //Time format -> min hour day-of-month month day-of-week
    // 0 0 * * * = midnight
    cron.schedule('0 0 * * *', async function () {
      console.log(`Schedular started at ${new Date().toLocaleString()}`);
      await userService.removeOldInactiveAccounts();
    });
  }

//Create Server
app.listen(config.hostPORT, async (err) => {
    if (err) throw err
    await scheduler();
    console.log('Server running in http://' + config.hostIP + ':' + config.hostPORT);
});