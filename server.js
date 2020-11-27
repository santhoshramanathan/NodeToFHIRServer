const express = require('express');
var Request = require("request");
var username="fhiruser";
var password="change-password";
var auth = "Basic "+new Buffer(username + ":" + password).toString("base64");
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

app.get('/insurancePlan', (req, res) => {
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

/*app.post('/insurancePlan', (req, res) => {
	  Request.post({
		            url : "https://localhost:9443/fhir-server/api/v4/Observation",
		            headers : { "Authorization" : auth},
		            rejectUnauthorized: false,
		            requestCert: true,
		            agent: false,
		            body: req.body
	  }, (error, response, body) => {
		      if(error) {
			                      res.send(error);
			              return console.dir(error);
			          }

		          res.send(JSON.parse(body));
	  });
});
*/
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
