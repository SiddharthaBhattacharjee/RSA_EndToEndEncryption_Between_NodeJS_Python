import requests

url_2 = 'http://localhost:3000/check'
json_data = {"key1":"value1test","key2":"value2test"}

res = requests.post(url=url_2, json=json_data)
print(res)