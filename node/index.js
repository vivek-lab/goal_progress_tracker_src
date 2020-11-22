const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000
mongoose.connect('mongodb://localhost:27017/goal_progress_tracking', { useNewUrlParser: true, useUnifiedTopology: true });

const goalSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String,
    priority: Number,
    startDate: Date,
    endDate: Date,
});

const Goal = mongoose.model('Goal', goalSchema);

function addGoals() {


    for (let i = 0; i < 4; i++) {
        let goal = new Goal({
            name: "Goal1",
            description: "A short goal",
            type: "Short",
            priority: 1,
            startDate: new Date(),
            endDate: new Date(),
        });
        goal.save(function (err, goal) {
            if (err) {
                console.log(err);
            } else {
                console.log("goal saved");
            }
        });
    }

    for (let i = 0; i < 4; i++) {
        let goal = new Goal({
            name: "Goal1",
            description: "A long goal",
            type: "Long",
            priority: 1,
            startDate: new Date(),
            endDate: new Date(),
        });
        goal.save(function (err, goal) {
            if (err) {
                console.log(err);
            } else {
                console.log("goal saved");
            }
        });
    }
}

// addGoals();




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

app.post('/addGoal', (req, res) => {
    console.log(req.body);
});

// app.get('/', (req, res) => {
//     res.send('Hi Axios');
// })

// app.get('/contact', (req, res) => {
//     res.send('Contact me at : viveksingh7396@gmail.com')
// })


app.use(express.static("public"));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})