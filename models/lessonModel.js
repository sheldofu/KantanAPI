var mongoose = require('mongoose');

var LessonSchema = new mongoose.Schema({
	lessonID: {
		type: Number,
		required: true
	},
	lessonName: {
		type: String,
		required: true
	},
	level: {
		type: Number
	},
	summary:{
		type: String,
		required: true
	},
	lessonText:{
		type: String,
		required: true
	}

});

module.exports = mongoose.model('Lesson', LessonSchema);