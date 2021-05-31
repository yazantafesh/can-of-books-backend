'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

mongoose.connect('mongodb://localhost:27017/books',
    { useNewUrlParser: true, useUnifiedTopology: true });


const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String

});

const UserSchema = new mongoose.Schema({
    email: String,
    books: [BookSchema]
});

const UserModel = mongoose.model('user', UserSchema);
const BookModel = mongoose.model('book', BookSchema);

function seedBookCollection() {
    const alchemist = new BookModel({
        name: 'The Alchemist',
        description: 'The Alchemist is a novel by Brazilian author Paulo Coelho that was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller.',
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR0tgvYN4QHjHQDige5hIX2HkIe5hLSgwDr5zrn2Vd1-bchhyIM'
    });
    const immortality = new BookModel({
        name: 'Immortality',
        description: 'Immortality is a novel in seven parts, written by Milan Kundera in 1988 in Czech. First published 1990 in French. English edition 345 p., translation by Peter Kussi. This novel springs from a casual gesture of a woman, seemingly to her swimming instructor.',
        img: 'https://images-na.ssl-images-amazon.com/images/I/71LPqVJa0aL.jpg'
    });
    const angelsAndDemons = new BookModel({
        name: 'Angels and Demons',
        description: 'Angels & Demons is a 2000 bestselling mystery-thriller novel written by American author Dan Brown and published by Pocket Books and then by Corgi Books. The novel introduces the character Robert Langdon, who recurs as the protagonist of Browns subsequent novels. ',
        img: 'https://images-na.ssl-images-amazon.com/images/I/61d1QJ0tPhL.jpg'
    });



    alchemist.save();
    immortality.save();
    angelsAndDemons.save();
}

// seedBookCollection();

function seedUserCollection() {
    const yazan = new UserModel({
        email: 'yazantafesh1@gmail.com',
        books: [
            {
                name: 'Angels and Demons',
                description: 'Angels & Demons is a 2000 bestselling mystery-thriller novel written by American author Dan Brown and published by Pocket Books and then by Corgi Books. The novel introduces the character Robert Langdon, who recurs as the protagonist of Browns subsequent novels. ',
                img: 'https://images-na.ssl-images-amazon.com/images/I/61d1QJ0tPhL.jpg'
            }
        ]
    });

    const batool = new UserModel({
        email: 'batoolayyad1996@yahoo.com',
        books: [
            {
                name: 'Immortality',
                description: 'Immortality is a novel in seven parts, written by Milan Kundera in 1988 in Czech. First published 1990 in French. English edition 345 p., translation by Peter Kussi. This novel springs from a casual gesture of a woman, seemingly to her swimming instructor.',
                img: 'https://images-na.ssl-images-amazon.com/images/I/71LPqVJa0aL.jpg'
            },
            {
                name: 'The Alchemist',
                description: 'The Alchemist is a novel by Brazilian author Paulo Coelho that was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller.',
                img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR0tgvYN4QHjHQDige5hIX2HkIe5hLSgwDr5zrn2Vd1-bchhyIM'
            }
        ]
    });

    yazan.save();
    batool.save();
}
// seedUserCollection();

app.get('/', homePageHandler);
app.get('/books',getBooksHandler);

function homePageHandler(req, res) {
    res.send('You are on the homepage')
}

function getBooksHandler(req,res) {
    let userEmail = req.query.email;
    // let {name} = req.query
    UserModel.find({email:userEmail},function(err,userData){
        if(err) {
            console.log('did not work')
        } else {
            console.log(userData)
            console.log(userData[0])
            console.log(userData[0].books)
            res.send(userData[0].books)
        }
    })
}

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})