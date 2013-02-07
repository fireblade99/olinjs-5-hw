var models = require('./models');

exports.index = function(req, res, next){
  req.facebook.api('/me', function(err, data) {
  	//console.log(data);
	  if (!req.session.user){
	  	models.User.findOne({username : data.username},function(err, user) {
				if (err) return console.log('error', err);
				if (user) {
					req.session.user = user;
					console.log(user.username);
					console.log('ALREADY A USER');
					res.redirect('/');
				}
				else {
			  	var newUser = new models.User(data);
			  	newUser.save(function(err){
						console.log('saving user');
						if(err) return console.log("error", err);
						req.session.user = newUser;

					});
			  }
			});
			next();
		}

		else {
			models.User.findOne({username : req.session.user.username}, function(err, doc){
				res.render('loggedIn', {title: doc.name, user: doc});
			});
		}
	});

};



exports.getPic = function(req, res){
	req.facebook.api('/me/picture?redirect=false', function(err, data){

		//console.log(data.data.url);
		models.User.findOne({username : req.session.user.username}, function(err, doc){
			if(err) return console.log('error', err);
			doc.imglink = data.data.url;
			doc.save(function(err){
				if(err) return console.log('error', err);
			});
			res.render('loggedIn', {title: doc.name, user: doc});
		});

	});

};
