var stream = require('stream');
var csv = require("fast-csv");
var fs = require('fs');
var json2csv = require('json2csv');


const db = require('../config/db.config.js');
const File = db.files;
const User = db.users;

exports.uploadFile = (req, res) => {
	var csvfile = "./uploads/"+req.file.originalname;
	console.log(csvfile);
	var stream = fs.createReadStream(csvfile);

var csvStream = csv()
        .on("data", function(data){
         console.log(data[1]);

         // insert users data into users table
         var item = new User({
              name: data[1] ,
              email: data[2]   ,
              phone: data[3],
              image: data[4] ,
              title:data[5] 
         });
         
          item.save(function(error){
            console.log(item.get('id'));
              if(error){
                   throw error;
              }
          }); 

         

    	}).on("end", function(){

    });
  
    stream.pipe(csvStream);


	File.create({
		type: req.file.mimetype,
		name: req.file.originalname,
		data: req.file.buffer
	}).then(() => {
		res.json({msg:'File uploaded successfully! -> filename = ' + req.file.originalname});
	})
}

exports.listAllFiles = (req, res) => {
	File.findAll({attributes: ['id', 'name']}).then(files => {
	  res.json(files);
	});
}

exports.downloadFile = (req, res) => {
	File.findById(req.params.id).then(file => {
		var fileContents = Buffer.from(file.data, "base64");
		var readStream = new stream.PassThrough();
		readStream.end(fileContents);
		
		res.set('Content-disposition', 'attachment; filename=' + file.name);
		res.set('Content-Type', file.type);

		readStream.pipe(res);
	})
}