/* eslint-disable import/newline-after-import */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
    console.error(err.name, err.message);
    process.exit(1);
});

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB.');
    });

const app = require('./app');

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
