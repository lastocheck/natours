/* eslint-disable import/newline-after-import */
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./models/tourModel');
dotenv.config({ path: './config.env' });

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

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Success');
    } catch (error) {
        console.error(error);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
}
