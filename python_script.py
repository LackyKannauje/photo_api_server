import requests
import os
import json
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('IMAGGA_API_KEY')
api_secret = os.getenv('IMAGGA_API_SECRET')
image_path = './public/image.jpg'

response = requests.post(
    'https://api.imagga.com/v2/tags',
    auth=(api_key, api_secret),
    files={'image': open(image_path, 'rb')})
resp = response.json()
print(json.dumps(resp))  
