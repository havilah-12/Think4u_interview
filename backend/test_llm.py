import requests

url = "http://127.0.0.1:8000/chat"
payload = {"message": "What is the capital of France?"}

response = requests.post(url, json=payload)
print(response.json())
