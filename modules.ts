const express = require('express');
const cors =  require('cors');
const app = express();
const NodeRSA = require('node-rsa');
const Crypto_ = require('crypto');
var fs = require("fs");
app.use(cors());
var bodyParser = require('body-parser');

// Global Key def
const key = new NodeRSA({ b: 1024 });
key.importKey
const fsPri = fs.readFileSync("./privateKey.txt", 'utf8');
const fsPub = fs.readFileSync("./publicKey.txt", 'utf8');

// Module Functions

// Decrypt function: Takes encrypted binary, private key string -> returns decrypted string
function custom_Decrypt(emsg:any, Priv_key:any):string{
    const Priv_key_obj = new NodeRSA(Priv_key);
    const dmsg = Priv_key_obj.decrypt(emsg, 'utf8');
    return dmsg;
}

// Encrypt function: Takes string msg, public key string -> returns encrypted binary
function custom_Encrypt(msg:string, Pub_key:any):any{
    const encryptedMessage = Crypto_.publicEncrypt(Pub_key, Buffer.from(msg));
    return encryptedMessage;
}



app.post('/check', express.json(), async (req:any, res:any) => {
    var data = req.body;
    console.log('test',data);
    console.log('test',data.key1);
    console.log('test',data.key2);
    res.send('JSON uploaded successfully!');
});

app.post('/upload',bodyParser.raw({type: 'application/octet-stream', limit : '2mb'}), async (req:any, res:any) => {

    // Test Decryption
    var contents = req.body;
    console.log(contents);

    const decryptedMsg = custom_Decrypt(contents, fsPri);

    console.log(decryptedMsg)

    const test_ = JSON.parse(decryptedMsg);
    console.log(test_);
    console.log(test_.key1);
    console.log(test_.key2);

    

    const data = "AuthenticationKey==293jdq17hp9f";
    const encryptedMessage = custom_Encrypt(data,fsPub);
    console.log(encryptedMessage);
    res.send(encryptedMessage);
});



app.listen(3000, () => {
    console.log('Server running on port 3000');
});