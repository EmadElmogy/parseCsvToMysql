const multer = require('multer');

// var storage = multer.memoryStorage()
const storage = multer.diskStorage({
	destination: 'uploads/',
	filename: function (req, file, callback) {
		//console.log(file)
		callback(null, file.originalname)
	}
});

var upload = multer({storage: storage});
// var upload = multer({ dest: 'uploads/' })

module.exports = upload;