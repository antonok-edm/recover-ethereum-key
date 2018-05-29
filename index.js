const keythereum = require("keythereum");
const fs = require('fs');
const passprompt = require('password-prompt');

if(process.argv.length < 3) {
	console.log("First argument must be the path to an Ethereum keystore JSON file.");
	process.exit();
}

let jsonfile = process.argv[2];

let keyObject = JSON.parse(fs.readFileSync(jsonfile));

let promise = passprompt('Enter Ethereum wallet password: ', {method: "hide"});
promise.then(password => {
	try {
		let privateKey = keythereum.recover(password, keyObject);
		let readablePrivateKey = privateKey.toString('hex');
		console.log(readablePrivateKey);
	}
	catch(err) {
		console.log("Could not recover private key from the specified password. Exiting.");
		process.exit();
	}
}, err => {
	console.log("Could not read password. Exiting.");
	process.exit();
});
