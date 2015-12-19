/*
Relay pins:

VCC - 2
GND - 6 
IN  - 15 (GPIO22)

*/
var http = require('http');
var url  = require('url');
var fs   = require('fs'); 
var gpio = require('gpio');
var gpio22;
var onoff = 0;
var intervalTimer;

// Create and start webserver on port 3000
var server = http.createServer(function (request, response) {
	
	if (request.url == '/on') {

		onoff = 1;
		response.end();
			
	} else if (request.url == '/off') {

		onoff = 0;
		response.end();
			
	} else {
		fs.readFile('./index.html', function(err, data) {
			if (err) {
				throw err;
			}
			
			// Enable gpio 22 
			gpio22 = gpio.export(22, {
			   ready: function() {
				 // Set timer 
				 intervalTimer = setInterval(function() {
						
						if (onoff == 1) {
							gpio22.set();        
						} else {
							gpio22.reset();        
						}      
				  
				  }, 500);
			   }
			});					
			
			// Write html output
			response.writeHead(200, {"Content-Type": "text/html"});
			response.end(data.toString() + '\n');
		});
	}

}); 

server.listen(3000);

// Cleanup on exit
process.on('SIGINT', function() {
	console.log('\nexit, cleaning up...');
	clearInterval(intervalTimer);
	
	// Reset and release gpio port
	gpio22.reset();                
    gpio22.unexport(function () {  
		console.log('...done.');	
		process.exit(0);		
	});                     
});
