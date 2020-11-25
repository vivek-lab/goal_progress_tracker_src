const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/practice1', { useNewUrlParser: true, useUnifiedTopology: true });



const schema1 = new mongoose.Schema({
    name: String,
    add: String,
});

const schema2 = new mongoose.Schema({
    s1: { type: [schema1], index: true }
});

const s1 = mongoose.model("S1", schema1);
const s2 = mongoose.model("S2", schema2);

let m = new s1({
    name: "test schema",
    add: "test add"
});


let n = new s2({
    s1: [m]
});

// m.save();
n.save();


// s1.find({},function(err,doc){
//     doc[0].name = "updated"
//     doc[0].save();
// });