const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require("./routes/api/users");
const videos = require("./routes/api/videos");
const User = require("./models/User");
const Review = require("./models/Review");


app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//route 
app.use("/api/users", users);
app.use("/api/videos", videos);


// app.get("/", (req, res)=> {
//     const user  = new User({
//         firstName: "jeff",
//         lastName: "smith",
//         email: "jeff@mail.com",
//         password: '123456',
//         professional: true,
//         categories: "shrimp,keyboard",
//         interests: "spearfishing",
//         bio: "Hey guys I am very happy to be learning with you guys"
//     })
//     user.save();
//     res.send("saved");
// })

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`Server is running on port ${port}`));
