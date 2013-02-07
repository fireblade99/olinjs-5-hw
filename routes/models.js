var mongoose = require("mongoose");

mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

var userSchema = mongoose.Schema({
	'name' : String,
	'first_name' : String,
	'last_name' : String,
	'link' : String,
	'username' : String,
	'hometown' : String,
	'location' : String, 
	'quotes' : String,
	'gender' : String,
	'email' : String,
	'imglink' : String
});

var newUser = mongoose.model('User', userSchema);


exports.User = newUser;