const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');
const morgan = require('morgan');

const apiRoute = require('./routes/api');

config();

/**
 * @type {Number}
 */
const PORT = process.env.PORT || 8081;

const IS_DEV = process.env.NODE_ENVIRONMENT.toLowerCase().includes('dev');

setup();

function setup()
{
    const app = express();

    app.use(cors(), morgan(IS_DEV ? 'dev' : 'tiny'));

    app.use('/api', apiRoute);

    // setupApi(app);

    app.use(express.static('public'));
    
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}