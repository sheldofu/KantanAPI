const express = require('express'),
	bodyParser = require('body-parser'), 
	mongoose = require('mongoose'),
	app = express(),
	port = process.env.PORT || 9054,
	jwt = require('jsonwebtoken'),
	bcrypt = require('bcrypt'),
	config = require('./config'),
	middleware = require('./middleware'),
	LessonModel = require('./models/lessonModel'),
	UserModel = require('./models/userModel');

const url = process.env.MONGODB_URI || 'mongodb://localhost/kantanAPI'
mongoose.connect(url, function () {
  console.log('mongodb connected')
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*"); 
    next();
});

app.get("/lesson", middleware.checkToken, (req, res, next) => {

	console.log('lesson');

	LessonModel.find({}, function(err, lesson) {
		if (err) {
			next(err);
		}
		else {
			res.json(lesson);
		}
	});
});

app.post("/lesson", middleware.checkToken, (req, res, next) => {

	var newLesson = new LessonModel(req.body);
	newLesson.save(function(err, lesson) {
		if (err) {
			next(err);
			console.log(err);
		} else {
			res.json(lesson);
			console.log('lesson created');
		}
	});
});

app.post("/user", function (req, res, next) {

	const user = new UserModel({username: req.body.username});
	bcrypt.hash(req.body.password, 12, function (err, hash) {
		if (err) { 
			next (err)
		} else {
			user.password = hash
		}
		user.save(function (err) {
			if (err) {
				next(err)
			} else {
				return res.json({
					success: true,
					message: 'User created'
				});
			}
		})
	})

})

app.post("/token", (req, res, next) => {

	console.log('token endpoint');

	UserModel.findOne({username: req.body.username, active: true})
	.select('password')
	.exec(function(err, user){
		if (err) {
			next(err);
		} else if (!user) {
			return res.json({
				success: false,
				message: 'Username or password incorrect, or user inactive',
				//debug: 'username:' + req.body.username + 'password:' + req.body.password
			});
		} else {
			bcrypt.compare(req.body.password, user.password, function (err, valid) {
				if (err) {
					next(err)
				} else if (!valid) {
					return res.json({
						success: false,
						message: 'Password doesn\'t match'
					});					
				} else {
					let token = jwt.sign({username: req.body.username}, config.secret, { expiresIn: '12h' });
					return res.json({
						success: true,
						message: 'login successful',
						token: token
					});
				}
			})
		}
	})
});

app.listen(port);

console.log('RESTful API server started on: ' + port);



