const express = require("express");
const router = express.Router();
const expressLayouts = require("express-ejs-layouts");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");
const { ensureGuest } = require("../middleware/auth");

//init ejs
router.use(expressLayouts);

//Login
//GET to /
router.get("/", ensureGuest, (req,res) => {
	res.render("index/login", {
		layout: "layoutIndex",
		success_msg: req.flash("success_msg"),
		error_msg: req.flash("error")
	});
})

//Login
//POST to /login
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
	  successRedirect: '/main/index',
	  failureRedirect: '/',
	  failureFlash: true
	})(req, res, next);
  }
);

//Register
//GET to /register
router.get("/register", ensureGuest, (req,res) => {
	res.render("index/register", {layout: "layoutIndex"});
})

//POST to /register
router.post("/register", (req,res) => {
	console.log(req.body);
	const { nickname, email, password, passwordrepeat, profilepic, firstname, lastname, dob, gender, adress, city, postalcode, country, personalwebsite, fbprofile, instagramprofile, twitteraccount} = req.body;
	//chcek for errors
	let errors = [];
	//some backend validation of reqiued fields
	if (!/^[a-zA-Z0-9]{5,20}$/.test(nickname) || nickname === ""){
		//res.status(400).send({ msg: "Username must be alphanumeric and contains 5 and 20 characters" });
		errors.push({errorNickname: "Username must be alphanumeric and contains 5 and 20 characters" });
	}

	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) || email === ""){
		errors.push({errorEmail: "E-mail must be a valid adress, e.g. me@myadress.com" });
	}

	if (!/^(?=^.{6,20}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password) || password === ""){
		errors.push({errorPassword: "Password must be between 6 - 20 characters long and contains at least one number, one uppercase latter and one lowercase latter" });
	}
	
	if (password !== passwordrepeat || passwordrepeat === ""){
		errors.push({errorPasswordRep: "Your passwords must be equal and valid" });
	}
	
	//chceck email or username
	//User.find({ email: email }) //the method that can be called with models and mongo... email: from schema must match email: from const email from req.body (above) 
	User.findOne({
		$or: [
		{ email: email }, { nickname: nickname }
		]
	})
	.then(user => {
		if(user){
			if(user.email === email){
				errors.push({ errorMatchEmail: "This email is aleardy registered" })
			}
			if(user.nickname === nickname ) {
				errors.push({ errorMatchNick: "This nickname is aleardy taken" })
			}

			//if exists - send error and re-render registration form with all variables
			//so if user already filled registraion input, they are re-render with those values
			if(errors.length > 0){
				console.log(user);
				res.render("index/register", {
					layout: "layoutIndex",
					errors, 
					nickname, email, password, passwordrepeat, firstname, lastname, dob, gender, adress, city, postalcode, country, personalwebsite, fbprofile, instagramprofile, twitteraccount					
				},)
			}	
		} else{
			// if dosen't exist => check for errors again and re-render
			if(errors.length > 0){
				res.render("index/register", {
					layout: "layoutIndex",
					errors, 
					nickname, email, password, passwordrepeat, firstname, lastname, dob, gender, adress, city, postalcode, country, personalwebsite, fbprofile, instagramprofile, twitteraccount					
				},)
			} else{
				//if no errors => create one: const newUser = new User({ all varibles });
				const newUser = new User({
					nickname, email, password, passwordrepeat, profilepic, firstname, lastname, dob, gender, adress, city, postalcode, country, personalwebsite, fbprofile, instagramprofile, twitteraccount
				});
				//we need to create a salt, which will hash our plain text password
				//first method will generate a salt
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => { //second method will hash password with generated salt
						if (err) throw err;
						newUser.password = hash; //set password to hashed password
					
						//save user to DB
						newUser.save()
						.then(user => {
							console.log(user);
							req.flash("success_msg", "You are now registered and can log in");
							res.redirect("/");
						})
						.catch(err => console.log(err))
					})
				})
			}
		}
	})
});

//LOGOUT
//Post to /logout
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect('/');
  });

module.exports = router
