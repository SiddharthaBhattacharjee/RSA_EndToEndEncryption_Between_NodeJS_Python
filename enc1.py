from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA
import requests
import base64

key = RSA.generate(1024)
privatekey = key.exportKey()
publickey = key.publickey().exportKey()

with open("publicKey.txt", "wb") as pb: 
    pb.write(publickey)
    pb.close()
	
with open("privateKey.txt", "wb") as pb: 
    pb.write(privatekey)
    pb.close()

#print privatekey
#print publickey

privKeyObj = RSA.importKey(privatekey)
pubKeyObj = RSA.importKey(publickey)

cipher = PKCS1_OAEP.new(pubKeyObj)

msg = '{"key1":"value1","key2":"value2"}'

emsg =  cipher.encrypt(msg.encode())

plain = PKCS1_OAEP.new(privKeyObj)

plainText = plain.decrypt(emsg).decode()

with open("encrypted.txt", "wb") as pb: 
	pb.write(emsg)

print(emsg)
print(plainText)
data_ = base64.b64encode(emsg)
headers = {'Content-Type': 'application/octet-stream'}

url_ = 'http://localhost:3000/upload'
res = requests.post(url=url_, data=emsg, headers=headers)
print("Response content: ",res.content)
decrypted_message = plain.decrypt(res.content)
print(decrypted_message)
