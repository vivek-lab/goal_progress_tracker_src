const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;
mongoose.connect('mongodb://localhost:27017/goal_progress_tracker', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const occurrenceSchema = new mongoose.Schema({
    occurrenceId: { type: Number, index: true },
    comment: String,
    date: Date,
    status: String
}, { _id: false }); // { _id: false } -< only applies to Sub Schema 

const goalSchema = new mongoose.Schema({
    name: String,
    description: String,
    priority: Number,
    startDate: Date,
    endDate: Date,
    occurrences: [occurrenceSchema]
});



const Occurrence = mongoose.model('Occurrence', occurrenceSchema);
const Goal = mongoose.model('Goal', goalSchema);



app.get('/goals', (req, res) => {
    Goal.find({}, function (err, goals) {
        if (err) {
            console.log(err);
            res.send("Some error at server");
        } else {
            res.send(goals);
        }
        // mongoose.connection.close();
    });
});

app.post('/allOccurrences', (req, res) => {
    console.log(req.body);
    Goal.find({
        startDate: { $gte: new Date(req.body.from) },
        endDate: { $lte: new Date(req.body.to) }
    }, function (err, goals) {
        if (err) {
            console.log(err);
            res.send("Some error at server");
        } else {
            const occurrenceList = [];
            goals.forEach(function (goal) {
                goal.occurrences.forEach(function (occurrence) {
                    occurrenceList.push(occurrence);
                });
            });
            res.send(occurrenceList);
        }
        // mongoose.connection.close();
    });
});

const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
function addDays(baseDate, days) {
    let date = new Date(baseDate.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


app.post('/saveGoal', (req, res) => {
    console.log(req.body);

    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    const period = (endDate - startDate) / oneDay;
    let date = startDate;
    const occurrenceList = [];
    for (let dayItr = 0, occurrenceItr = 0; dayItr <= period; dayItr++) {

        if (req.body.occurrence[weekDays[date.getDay()]]) {

            occurrenceList.push(
                new Occurrence({
                    occurrenceId: occurrenceItr++,
                    comment: "",
                    date: date,
                    status: "New"
                })
            );
        }

        date = addDays(date, 1);
    }

    const goal = new Goal({
        name: req.body.name,
        description: req.body.description,
        priority: parseInt(req.body.priority),
        startDate: startDate,
        endDate: endDate,
        occurrences: occurrenceList
    });

    goal.save(function (err, goal) {
        if (err) {
            res.send(err);
        } else {
            console.log("Goal Saved");
        }
    });

    res.send("Success");
});


app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})