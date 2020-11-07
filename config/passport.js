const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

module.exports = (passport) => {
	/*passport.use(
		new LocalStrategy({usernameField: "email"}, (email, password, done) => {
			//find user by email
			User.findOne({ email: email })
			.then(user => {
				if(!user){ 
					// posleme done(error, user, options) ... null ak neni error, false ak neni user, options.. je sprava
					return done(null, false, { massage: "That email is not regitred"})
				}

				//match password
				/*bcrypt.compare(password, user.password)
				.then((res) => {
					if(res){
						return done(null, user)
					} else {
						return done(null, false, { massage: "Password incorrect" })
					}
				})
				.catch(err => console.log(err));*/

				//match password
				/*bcrypt.compare(password, user.password, (err, isMatch) => {
					if(err) throw err;
					if(isMatch){
						// posleme usera
						return done(null, user)
					} else{
						return done(null, false, { massage: "Password incorrect" })
					}
				})
			})
			.catch(err => console.log(err))
	  	}	
	));*/
	
	passport.use(new LocalStrategy({
		usernameField: 'email',
	  },
		(email, password, done) => {
		  User.findOne({ email: email }, (err, user) => {
			if (err) { 
				return done(err); 
			}
			if (!user) {
			  return done(null, false, { message: 'Email is not registered' });
			}

			bcrypt.compare(password, user.password, (err, isMatch) => {
				if(err) throw err;
				if(isMatch){
					return done(null, user)
				} else{
					return done(null, false, { message: "Password incorrect" })
				}
			})
		  });
		}
	  ));

	passport.serializeUser((user, done) => {
		done(null, user.id);
	  });
	  
	  passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
		  done(err, user);
		});
	  });
}