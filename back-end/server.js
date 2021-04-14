const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/cp4', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a scheme for argument
const argumentSchema = new mongoose.Schema({
  name: String,
});

// Create a model for argument
const Argument = mongoose.model('Argument', argumentSchema);

// Create an argument
app.post('/api/arguments', async (req, res) => {
  const argument = new Argument({
    name: req.body.name
  });
  try {
    await argument.save();
    res.send(argument);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all arguments
app.get('/api/arguments', async (req, res) => {
  try {
    let arguments = await Argument.find();
    res.send(arguments);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Schema for comments
const commentSchema = new mongoose.Schema({
    argument: {
        type: mongoose.Schema.ObjectId,
        ref: 'Argument'
    },
    userName: String,
    message:  String,
    date: String,
})

// Model for comments
const Comment = mongoose.model('Comment',commentSchema);

app.post('/api/arguments/:argumentID/comments', async (req, res) => {
    try {
        let argument = await Argument.findOne({_id: req.params.argumentID});
        if (!argument) {
            res.send(404);
            return;
        }
        // //console.log(argument);
        let comment = new Comment({
            argument: argument,
            userName: req.body.userName,
            message:  req.body.message,
            date: req.body.date,
        });
        await comment.save();
        res.send(comment);
    } catch (error) {
        //console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/arguments/:argumentID/comments', async (req, res) => {
    try {
        let argument = await Argument.findOne({_id: req.params.argumentID});
        if (!argument) {
            res.send(404);
            return;
        }
        let comments = await Comment.find({argument:argument});
        res.send(comments);
    } catch (error) {
        ////console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/arguments/:argumentID/comments/:commentID', async (req, res) => {
  ////console.log("made it to the start of put");
    try {
        let comment = await Comment.findOne({_id:req.params.commentID, argument: req.params.argumentID});
        if (!comment) {
            res.send(404);
            return;
        }
        ////console.log("made it past the try");
        comment.userName = req.body.userName;
        comment.message = req.body.message;
        comment.date = req.body.date;
        await comment.save();
        res.send(comment);
    } catch (error) {
        ////console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/arguments/:argumentID/comments/:commentID', async (req, res) => {
    try {
        let comment = await Comment.findOne({_id:req.params.commentID, argument: req.params.argumentID});
        if (!comment) {
            res.send(404);
            return;
        }
        ////console.log("Before delete");
        await comment.delete();
        ////console.log("After delete");
        res.sendStatus(200);
    } catch (error) {
      //  //console.log(error);
        res.sendStatus(500);
    }
});


app.listen(3001, () => console.log('Server listening on port 3001!'));
