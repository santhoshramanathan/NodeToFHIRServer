const express = require('express');
var Request = require("request");
const fetch = require('node-fetch');
var username="fhiruser";
var password="change-password";
var auth = "Basic "+new Buffer(username + ":" + password).toString("base64");

const headers = {
	"Authorization" : auth, rejectUnauthorized: false, requestCert: true, agent: false
}
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

app.get('/Observation', (req, res) => {
  Request.get({
	  url : "https://150.238.99.51:9443/fhir-server/api/v4/Observation",
	  headers : { "Authorization" : auth},
	  rejectUnauthorized: false,
	  requestCert: true,
	  agent: false
}, (error, response, body) => {
    if(error) {
		res.send(error);
        return console.dir(error);
    }
    
	res.send(JSON.parse(body));
});
});

app.get('/Observation/:id', (req, res) => {
  Request.get({
	  url : "https://150.238.99.51:9443/fhir-server/api/v4/Observation/"+req.params.id,
	  headers : { "Authorization" : auth},
	  rejectUnauthorized: false,
	  requestCert: true,
	  agent: false
}, (error, response, body) => {
    if(error) {
		res.send(error);
        return console.dir(error);
    }
    
	res.send(JSON.parse(body));
});
});


app.post('/Observation', (req, res) => {
	  Request.post({
		            url : "https://150.238.99.51:9443/fhir-server/api/v4/Observation",
		            headers : { "Authorization" : auth},
		            rejectUnauthorized: false,
		            requestCert: true,
		            agent: false,
		            body: req.body,
					json: true
	  }, (error, response, body) => {
		      if(error) {
			                      res.send(error);
			              return console.dir(error);
			          }

		          res.send(body);
	  });
});

app.delete('/Observation/:id', (req, res) => {
	
	var id = req.params.id;
	var url = "https://150.238.99.51:9443/fhir-server/api/v4/Observation/"+id;
  Request.delete({
	  url : url,
	  headers : { "Authorization" : auth},
	  rejectUnauthorized: false,
	  requestCert: true,
	  agent: false
}, (error, response, body) => {
    if(error) {
		res.send(error);
        return console.dir(error);
    }
    
	res.send();
});
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
