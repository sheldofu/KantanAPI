var express = require('express'),
	bodyParser = require('body-parser'), 
	mongoose = require('mongoose'),
	app = express(),
	port = process.env.PORT || 9054,
	LessonModel = require('./models/lessonModel');
	UserModel = require('./models/userModel');
	
var url = process.env.MONGODB_URI || 'mongodb://localhost/kantanAPI'
mongoose.connect(url, function () {
  console.log('mongodb connected')
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/getLesson", (req, res, next) => {
	LessonModel.find({}, function(err, lesson) {
		if (err) {
			next(err);
		}
		else {
			res.json(lesson);
		}
	});
});

app.post("/createLesson", (req, res, next) => {
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

app.listen(port);

console.log('RESTful API server started on: ' + port);



