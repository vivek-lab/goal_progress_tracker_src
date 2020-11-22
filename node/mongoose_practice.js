const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true, useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema({
    name: String, quantity: {
        type: Number,
        min: 5
    }
});

const Fruit = mongoose.model('Fruit', fruitSchema);

const mango = new Fruit({ name: 'Mango', quantity: 12 });
const banana = new Fruit({ name: 'Banana', quantity: 6 });
const orange = new Fruit({ name: 'Orange', quantity: 10 });

// Fruit.insertMany([mango, banana, orange], function (err, msg) {
//     if (err) {
//         console.log("err: " + err);
//     } else {
//         console.log("msg: " + msg);
//     }
//     mongoose.connection.close();
// });

// Fruit.updateOne({ _id: "5fb8f1f5f35e5201c393db64" }, { quantity: 8 }, function (err, msg) {
//     if (err) {
//         console.log("err: " + err);
//     } else {
//         console.log("msg: " + msg);
//     }
//     mongoose.connection.close();
// });

Fruit.deleteOne({name : "Mango"},function (err, msg) {
    if (err) {
        console.log("err: " + err);
    } else {
        console.log("msg: " + msg);
    }
    mongoose.connection.close();
});

// mango.save().then(() => console.log('saved'));
// mongoose.disconnect().then(() => console.log('Bhow'));

// Fruit.find(function (err, fruits) {
//     if (err) {
//         console.log(err);
//     } else {
//         mongoose.connection.close();
//         console.log(fruits);
//     }
// });