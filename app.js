require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'Our little secret.',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).exec();
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// must be under of serialize and deserialize
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  }, async (accessToken, refreshToken, profile, cb) => {
    try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
            return cb(null, user);
        } else {
            const newUser = await User.create({ googleId: profile.id });
            return cb(null, newUser);
        }
    } catch (err) {
        return cb(err);
    }
}));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("'/auth/google'", passport.authenticate('google', {scope: ['profile']}));

app.get("/auth/google/secrets",
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/secrets');
    }
);

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/secrets", async (req, res) => {
    try {
        const results = await User.find({ secret: { $ne: null } }).exec();
        res.render("secrets", { usersWithSecrets: results });
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

app.get("/submit", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    }
});

app.post('/submit', async (req, res) => {
    try {
        const foundUser = await User.findById(req.user.id).exec();
        if (foundUser) {
            foundUser.secret = req.body.secret;
            await foundUser.save();
            res.redirect('/secrets');
        }
    } catch (err) {
        console.log(err);
        res.redirect("/submit");
    }
});

app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/");
    });
});

app.post("/register", async (req, res) => {
    try {
        const user = new User({ username: req.body.username });
        await User.register(user, req.body.password);
        passport.authenticate("local")(req, res, () => {
            res.redirect("/secrets");
        });
    } catch (err) {
        console.log("Error in registering.", err);
        res.redirect("/register");
    }
});

app.post("/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
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