var cheerio = require("cheerio");

var jsdom = require("jsdom");
jsdom.defaultDocumentFeatures = { 
  FetchExternalResources   : ['script'],
  ProcessExternalResources : ['script'],
  MutationEvents           : '2.0',
  QuerySelector            : false
};
var fs = require('fs');
// page.open("./html/1.html");

a = fs.readFileSync("./html/1.html");
a = String(a)

jsdom.env(a,["http://code.jquery.com/jquery.js"], function(err, window){
	function(t,e,r,n,c,a,p){try{t=document.currentScript||function(){for(t=document.getElementsByTagName('script'),e=t.length;e--;)if(t[e].getAttribute('data-cfhash'))return t[e]}();if(t&&(c=t.previousSibling)){p=t.parentNode;if(a=c.getAttribute('data-cfemail')){for(e='',r='0x'+a.substr(0,2)|0,n=2;a.length-n;n+=2)e+='%'+('0'+('0x'+a.substr(n,2)^r).toString(16)).slice(-2);p.replaceChild(document.createTextNode(decodeURIComponent(e)),c)}p.removeChild(t)}}catch(u){}}
	var sex = window.$('span.field-content')

	console.log(sex.text())
})



function parse(html){
	$ = cheerio.load(html)
	var info = {};
	var views = $('div.views-field');
	for(i = 0; i < views.length; i++){
		var pair = cheerio.load(views[i])
		var key = pair("span.views-label").text().keyify()
		var value = pair("span.field-content").text()
		console.log(key + ":  " + value )
	}
	return info
}


String.prototype.keyify = function() {
	str = this.substring(0, this.length - 1)
	return str.split(" ").join("_").toLowerCase()
}



module.exports = {
	parse: parse
}

