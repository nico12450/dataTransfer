const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');

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

	else if(req.method === 'POST'){

		var body = '';

	    req.on('data', chunk => {
	        body += chunk.toString();
	    });

	    req.on('end', () => {

	    	var donnees = parse(body);
	        //console.log(donnees);
	        var response = {
    			status  : 200,
    			success : 'Updated Successfully'
			};

	        rep.end(JSON.stringify(response));
	        
	    });

	}

}).listen(8080);