from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)
CORS(app)


@app.route("/search", methods=['POST'])
def search():
    search_data = request.get_json()
    location = search_data.get('searchQuery', 'London')

    return index(location)



def index(location):
    loc_type = ""
    
    limit = "1"

    api_key_OpenWeather = os.getenv('WEATHER_API_KEY')

    # Geocoding API call depending on input, city vs zip code
    if location[0].isdigit():
        zipcode = location
        url_location = f"http://api.openweathermap.org/geo/1.0/zip?zip={zipcode}&appid={api_key_OpenWeather}"
        loc_type = "zip"
    else:
        city = location
        url_location = f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit={limit}&appid={api_key_OpenWeather}"
        loc_type = "city"

    response_location = requests.get(url_location)
    data_location = response_location.json()

    if not data_location:
        return jsonify({"error": "Location not found"}), 404

    if loc_type == "zip":
        lat = data_location["lat"]
        lon = data_location["lon"]
    else:
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

    api_key_Yelp = os.getenv('YELP_API_KEY')

    headers = {
    "accept": "application/json",
    "Authorization": f"Bearer {api_key_Yelp}"
    }   

    response_travel = requests.get(url_travel, headers=headers)
    data_travel = response_travel.json()
    businesses = [business["name"] for business in data_travel["businesses"]]
    businesses.insert(0,location)
    return jsonify(businesses=businesses)



if __name__ == "__main__":
    app.run(debug=True)