var request = require('request');
var fs = require('fs');
var parser = require('./parser.js');
var links = fs.readFileSync("links.txt")
var links_array = String(links).split(",")



function getRehabHtml() {
  for (var i = 0; i < links_array.length; i++) {
    count = 0
    request(links_array[i], (err, response, body) => {
    	fs.writeFile("./html/" + count + ".html", body);
    	count ++ 
    	console.log("File " + count + " written")
    })
  }
}

function openPage() {
	
}

// function getTest() {
//   count = 0
//   request(links_array[1], function(error, response, body) {
//     parser.parse(body)
//     count++
//   })

// }

// getTest()

getRehabHtml()