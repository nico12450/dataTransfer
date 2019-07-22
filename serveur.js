const http = require('http');
const fs = require('fs');

http.createServer(function(req,rep){

	var adresse = req.url;

	rep.writeHeader(200, {"Content-Type": "text/html"});

	if(adresse == "/favicon.ico"){

    }

    else if(adresse == "/"){

		fs.readFile('./interface.html',function(err,pageAccueil){

			rep.write(pageAccueil);
			rep.end();

		});

	}

	else if(adresse == "/donnees"){

		fs.readFile('./donneesTest.json',function(err,donnees){

			if(err) throw err;

			var donneesJSON = JSON.parse(donnees);

			donneesJSON = JSON.stringify(donneesJSON);

			rep.writeHead(200, {"Content-Type": "application/json"});
			rep.write(donneesJSON);
			rep.end();

		});

	}

}).listen(8080);