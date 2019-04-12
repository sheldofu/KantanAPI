const express = require('express'),
	bodyParser = require('body-parser'), 
	mongoose = require('mongoose'),
	app = express(),
	port = process.env.PORT || 9054,
	jwt = require('jsonwebtoken'),
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
//app.use(middleware.checkToken);

app.get("/lesson", middleware.checkToken, (req, res, next) => {
	LessonModel.find({}, function(err, lesson) {
		if (err) {
			next(err);
		}
		else {
			res.json(lesson);
		}
	});
});

app.post("/lesson", (req, res, next) => {
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
})

app.post("/token", (req, res, next) => {

	const payloadTest = "test"

    let token = jwt.sign({payloadTest: payloadTest}, config.secret, { expiresIn: '12h' });
    res.send(token);	
})


app.listen(port);

console.log('RESTful API server started on: ' + port);



