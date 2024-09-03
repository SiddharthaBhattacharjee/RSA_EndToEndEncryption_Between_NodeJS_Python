from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA

key = RSA.generate(1024)
privatekey = key.exportKey()
publickey = key.publickey().exportKey()

with open("./keys/Org1_publicKey.txt", "wb") as pb: 
    pb.write(publickey)
    pb.close()
	
with open("./keys/Org1_privateKey.txt", "wb") as pb: 
    pb.write(privatekey)
    pb.close()
    
key = RSA.generate(1024)
privatekey = key.exportKey()
publickey = key.publickey().exportKey()

with open("./keys/Org2_publicKey.txt", "wb") as pb: 
    pb.write(publickey)
    pb.close()
	
with open("./keys/Org2_privateKey.txt", "wb") as pb: 
    pb.write(privatekey)
    pb.close()
    
key = RSA.generate(1024)
privatekey = key.exportKey()
publickey = key.publickey().exportKey()

with open("./keys/Gateway_publicKey.txt", "wb") as pb: 
    pb.write(publickey)
    pb.close()
	
with open("./keys/Gateway_privateKey.txt", "wb") as pb: 
    pb.write(privatekey)
    pb.close()