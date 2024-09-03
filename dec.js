const NodeRSA = require('node-rsa');
const crypto = require("crypto");
var fs = require("fs");

function print(msg){
    console.log(msg)
}

const key = new NodeRSA({b: 1024});

var contents = fs.readFileSync("./encrypted.txt");
print(contents);

var fsPri = fs.readFileSync("./privateKey.txt",'utf8');
print(fsPri);

var fsPub = fs.readFileSync("./publicKey.txt",'utf8');
print(fsPub)

const testPri = new NodeRSA(fsPri);

print(testPri);

const decrypt1 = testPri.decrypt(contents, 'utf8');

print(decrypt1)

const test_ = JSON.parse(decrypt1);
print(test_);
print(test_.key1);
print(test_.key2);

key.importKey

const data = "my secret data";
const testPub = new NodeRSA(fsPub);
const encryptedData = testPub.encrypt(data,'base64');
console.log("Encrypted data (base64):", encryptedData.toString("base64"));
const decrypt2 = testPri.decrypt(encryptedData, 'utf8');
console.log(decrypt2);
