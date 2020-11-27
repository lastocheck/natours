const fs = require('fs');
const express = require('express');
const { Certificate } = require('crypto');
const { create } = require('domain');

const app = express();

app.use(express.json());

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        },
    });
};

const getTour = (req, res) => {
    const tour = tours.find((el) => el.id === Number(req.params.id));

    if (tour) {
        return res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } else {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
};

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            });
        }
    );
};

// TODO: implement tour updating
const updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>',
        },
    });
};

// TODO: implement tour deleting
const deleteTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: null,
    });
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

const port = 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
