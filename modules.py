from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA
import requests
import base64

# Reading the public key
with open("publicKey.txt", "rb") as pb:
    pubKeyObj = RSA.importKey(pb.read())

# Reading the private key
with open("privateKey.txt", "rb") as pb:
    privKeyObj = RSA.importKey(pb.read())

# takes message to be encrypted, RSA public key object -> returns encrypted binary    
def custom_encrypt(msg,pub_key_obj):
    cipher = PKCS1_OAEP.new(pub_key_obj)
    emsg = cipher.encrypt(msg.encode())
    return emsg

# takes encrypted message to be decrypted, RSA private key object -> returns decrypted string
def custom_decrypt(emsg,priv_key_obj):
    cipher = PKCS1_OAEP.new(priv_key_obj)
    plainText = cipher.decrypt(emsg).decode()
    return plainText

# Sample encryption
msg = '{"key1":"value1","key2":"value2"}'
emsg = custom_encrypt(msg,pubKeyObj)

#sample decryption
plainText = custom_decrypt(emsg,privKeyObj)

print("Encrypted: ",emsg)
print("Decrypted: ",plainText)

#sample post request and response handling
data_ = base64.b64encode(emsg)
headers = {'Content-Type': 'application/octet-stream'}
url_ = 'http://localhost:3000/upload'

res = requests.post(url=url_, data=emsg, headers=headers)
print("Status code:",res.status_code)
if(res.status_code == 200):
    print("*******Success******")
print("Response content: ",res.content)
decrypted_message = custom_decrypt(res.content,privKeyObj)
print("Response Content Decrypted: ",decrypted_message)
