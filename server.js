const express = require('express');
var Request = require("request");
const fetch = require('node-fetch');
const cors=require('cors');
var username="fhiruser";
var password="change-password";
var url = "https://150.238.99.51:9443/fhir-server/api/v4/";
var auth = "Basic "+new Buffer(username + ":" + password).toString("base64");


const headers = {
	"Authorization" : auth, rejectUnauthorized: false, requestCert: true, agent: false
}
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

app.get('/queryparams', (req, res) => {
	if(req.query.patientid){
	res.send('query params values: '+ req.query.patientid);
	}
	else{
	res.send('no query params');
	}
});

app.get('/:operation', (req, res) => {
  
  if(req.query.patient) {
	 Request.get({
	  url : url+req.params.operation+'?patient='+req.query.patient,
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
  }
  else if(req.query.encounter)
  {
	 Request.get({
	  url : url+req.params.operation+'?encounter='+req.query.encounter,
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
  }
  else if(req.query.practitioner)
  {
	 Request.get({
	  url : url+req.params.operation+'?practitioner='+req.query.practitioner,
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
  }
  else if(req.query.recorder)
  {
	 Request.get({
	  url : url+req.params.operation+'?recorder='+req.query.recorder,
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
  }
  else 
  {
	  Request.get({
		  url : url+req.params.operation,
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
  }
});

app.get('/:operation/:id', (req, res) => {
  Request.get({
	  url : url+req.params.operation+"/"+req.params.id,
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


app.post('/:operation', (req, res) => {
	  Request.post({
		            url : url+req.params.operation,
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

app.delete('/:operation/:id', (req, res) => {
	
  Request.delete({
	  url : url+req.params.operation+"/"+req.params.id,
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
