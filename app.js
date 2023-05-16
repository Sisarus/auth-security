//jshint esversion:6
require('dotenv').config();
const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport =  require('passport');
const passportLocalMongoose = require('passport-local-mongoose')

const app =  express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'Our little sercet.',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userDB",{useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
    email: String,
    password: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/secrets", async (req, res) => {
    const results = await User.find({"secret": {$ne: null}}).exec();
    if (results) {
        res.render("secrets", {usersWithSecrets: results});
    }
});

app.get("/submit", (req, res) => { 
    if (req.isAuthenticated()){
        res.render("submit");
      } else {
        res.redirect("/login");
      }
});

app.post('/submit', async (req, res) => {
    const submittedSecret = req.body.secret;

    try {
        const foundUser = await User.findById(req.user.id).exec();
        if (foundUser) {
            foundUser.secret = submittedSecret;
            await foundUser.save();
            res.redirect('/secrets');
        }
    } catch (err) {
        console.log(err);
    }
});

app.get("/logout", (req, res)=> {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/");
    });
});

app.post("/register", async (req, res) => {
    try {
      const user = await User.register({ username: req.body.username }, req.body.password);
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    } catch (err) {
      console.log("Error in registering.", err);
      res.redirect("/register");
    }
});

app.post("/login", (req, res)=> {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err){
        if(err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    });
});


app.listen(port, () => {
    console.log("Server is running on port " + port);
});