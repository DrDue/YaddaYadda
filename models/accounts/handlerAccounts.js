const mongoose = require('mongoose');
const Account = require('./accounts');
const bcrypt = require('bcrypt');
const formidable = require('formidable');                       // required for image upload
const fs = require('fs');                                       // required for reading temp image file
//const { query } = require('express');
//const { delete } = require('../../app');


module.exports = {
    getAccount: async function(query, sort) {
        const dbname = "yadda";         // databasen hedder yadda
        const findDB = `mongodb://localhost:27017/${dbname}`;
        const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
        await mongoose.connect(findDB, conparam);
        const db = mongoose.connection;
        db.once("open", function() {
        console.log("Connected to server by mongoose");
        });
        let result = await Account.find(query, null, sort);
        return result;
    },

    createAccount: async function(req, res) {
        const dbname = "yadda";         // databasen hedder yadda
        const findDB = `mongodb://localhost:27017/${dbname}`;
        const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
        await mongoose.connect(findDB, conparam);
        const db = mongoose.connection;
        db.once("open", function() {
        console.log("Connected to server by mongoose");
        });
        
        let form = new formidable.IncomingForm();
        form.parse(req, async function(err, fields, files) {
            if (err) { console.error(err); }
      
            let { email, password, firstname, lastname, username } = fields;
            let errors = [];
      
            if (!firstname || !lastname || !username || !email || !password) {
                errors.push({ msg: 'Please enter all fields' });
            }
            if (password.length < 32) {
                errors.push({ msg: 'Password must be at least 32 characters' });
            }
            if (errors.length > 0) {            // respond if errors
                res.render('createUser', {
                    errors,
                    firstname,
                    lastname,
                    username,
                    email,
                    password
                });
            }
      
            let user = await Account.findOne({ username: username });
            if (user) {
                errors.push({ msg: 'users already exists' });
                res.render('createUser', {        // respond if already exists
                    errors,
                    firstname,
                    lastname,
                    username,
                    email,
                    password
                });
            }
      
      
            let hash = await bcrypt.hash(password, 10);
            let newUser = new Account({firstname: firstname, lastname: lastname, username: username, email: email, password: hash});
            newUser.avatar.data = await fs.readFileSync(files.avatar.path);   // read uploaded image
            newUser.avatar.MimeType = files.avatar.type;             // get its mimetype
            await newUser.save();
            //req.flash('success_msg', 'You are now registered and can log in');
            res.redirect('/login');
          })
    },

    verifyAccount: async function (req, res, next) {

        let check = { username: req.body.username };
        let u = await module.exports.getAccount(check);
        if (u.length !== 1) {
             req.session.destroy();
             return false;
        }
        console.log(u[0]);
        let success = await bcrypt.compare(req.body.password, u[0].password);
        if (success) {
            req.session.authenticated = true;       // set session vars
            req.session.email = u[0].email;
            req.session.rights = u[0].rights;      // set session vars
            req.session.username = u[0].username;
            if (req.session.rights === "admin") {
                admin = true;
            }
            if (req.session.rights === "user") {
                user = true
                }
        } else {
            debugger;
            req.session.destroy(); //req.session = null;
        }
        return success;
    },

    approveAccount: async function(chk) {
        const dbname = "yadda";         // databasen hedder yadda
        const findDB = `mongodb://localhost:27017/${dbname}`;
        const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
        await mongoose.connect(findDB, conparam);
        const db = mongoose.connection;
        db.once("open", function() {
            console.log("Connected to server by mongoose");
        });

        Account.updateOne(chk,
            { $set: {rights: 'user'}},
            function(error, savedDocument) {
                if (error)
                    console.log(error);
                console.log(savedDocument);
                db.close();
            }
        );
    },

    declineAccount: async function(chk) {
        const dbname = "yadda";         // databasen hedder yadda
        const findDB = `mongodb://localhost:27017/${dbname}`;
        const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
        await mongoose.connect(findDB, conparam);
        const db = mongoose.connection;
        db.once("open", function() {
            console.log("Connected to server by mongoose");
        });

        Account.updateOne(chk,
            { $set: {rights: 'awaiting'}},
            function(error, savedDocument) {
                if (error)
                    console.log(error);
                console.log(savedDocument);
                db.close();
            }
        );
    },

    lookupImage: async function (req, res) {
        let query = {username: req.params.userid};
        let user = await User.findOne(query);
        res.contentType(user.avatar.MimeType);
        res.send(user.avatar.data);
    }
};
