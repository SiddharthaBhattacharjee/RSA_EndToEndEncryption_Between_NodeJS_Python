const express = require('express');
const cors =  require('cors');
const app = express();
const NodeRSA = require('node-rsa');
const crypto = require('crypto');
var fs = require("fs");
app.use(cors());
var bodyParser = require('body-parser');

function print(msg) {
    console.log(msg)
}

app.post('/check', express.json(), async (req, res) => {
    var data = req.body;
    console.log('test',data);
    console.log('test',data.key1);
    console.log('test',data.key2);
    res.send('JSON uploaded successfully!');
});

app.post('/upload',bodyParser.raw({type: 'application/octet-stream', limit : '2mb'}), async (req, res) => {

    const key = new NodeRSA({ b: 1024 });

    var body_ = req.body;
    var contents = body_;


    print(contents);

    var fsPri = fs.readFileSync("./privateKey.txt", 'utf8');
    print(fsPri);

    var fsPub = fs.readFileSync("./publicKey.txt", 'utf8');
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

    const data = "AuthenticationKey==293jdq17hp9f";
    // const testPub = new NodeRSA(fsPub);
    // const encryptedData = testPub.encrypt(data,'base64');
    // console.log("Encrypted data (base64):", encryptedData.toString("base64"));
    // const decrypt2 = testPri.decrypt(encryptedData, 'utf8');
    // console.log(decrypt2);
    const encryptedMessage = crypto.publicEncrypt(fsPub, Buffer.from(data));

    res.send(encryptedMessage);
});



app.listen(3000, () => {
    console.log('Server running on port 3000');
});