'use strict';

const Glue = require('glue');

const manifest = {
    server: {
        port: 4000,
        host: '0.0.0.0'
    },
    register: {
        plugins: [
            /*{
                plugin: './services/customer',
            },
            {
                plugin: './services/inventory'
            },*/
            {
                plugin: './services/order',
            }
        ],
        options: {
            once: true,
            routes: { prefix: '/api' } 
        }
    }
};

const options = {
    relativeTo: __dirname
};

module.exports = exports = async function startServer() {
    try {
        const server = await Glue.compose(manifest, options);
        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};