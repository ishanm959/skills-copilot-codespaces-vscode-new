//create web server
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 3000;

//load data
let comments = [];
fs.readFile('data/comments.json', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        comments = JSON.parse(data);
    }
});

//set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set up static folder
app.use(express.static(path.join(__dirname, 'public')));

//set up body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set up routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Comments',
        comments: comments
    });
});

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    let comment = req.body;
    comments.push(comment);

    fs.writeFile('data/comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            console.log(err);
        } else {
            res.json(comment);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});