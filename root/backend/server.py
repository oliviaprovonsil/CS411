from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    city = "London"
    limit = "1"

    api_key_OpenWeather = "b65a4f8d4b6204531225d7784a7b3265"

    # Geocoding API call
    url_location = f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit={limit}&appid={api_key_OpenWeather}"

    response_location = requests.get(url_location)
    data_location = response_location.json()

    lat = data_location[0]["lat"]
    lon = data_location[0]["lon"]

    url_weather = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key_OpenWeather}&units=imperial"

    # Weather API response and JSON data
    response_weather = requests.get(url_weather)
    data_weather = response_weather.json()

    # Weather conditions
    conditions = data_weather["weather"][0]["main"]
    feels_like_farenheit = data_weather["main"]["feels_like"]

    term = ""
    if conditions in ["Clouds", "Rain", "Snow", "Thunderstorm", "Drizzle"] or feels_like_farenheit < 55:
        term = "indoor"
    else:
        term = "outdoor"

    url_travel = f"https://api.yelp.com/v3/businesses/search?term={term}&latitude={lat}&longitude={lon}"   

    api_key_Yelp = "jhib7BAFxq9vdmrhEIHAI5MVbPMG9PH3jP2NraAa_ExrFVpGRrygNhIyuwSls1Q_Op9EPanSxDArzaikyCyB2leHA-rH0uGbRaLwMPv1JXFdVcWbgsiyUQFv3VnmZXYx"

    headers = {
    "accept": "application/json",
    "Authorization": f"Bearer {api_key_Yelp}"
    }   

    response_travel = requests.get(url_travel, headers=headers)
    data_travel = response_travel.json()

    businesses = [business["name"] for business in data_travel["businesses"]]
    return jsonify(businesses=businesses)

@app.route("/search", methods=['POST'])
def search():
    search_data = request.get_json()
    location = search_data.get('searchQuery', '')


    return jsonify({"location from the backend": location})



if __name__ == "__main__":
    app.run(debug=True)