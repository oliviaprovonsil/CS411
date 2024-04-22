
"""
#from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route('/location', methods=['POST'])
def get_location():
    # Receive the city name from the frontend
    data = request.json
    city = data['city']
    
    # Geocoding API parameters
    limit = "1"
    api_key_OpenWeather = os.getenv('WEATHER_API_KEY')

    # Geocoding API call
    url_location = f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit={limit}&appid={api_key_OpenWeather}"
    response_location = requests.get(url_location)
    data_location = response_location.json()

    # Store the latitude and longitude of the user-specified location
    if data_location:
        lat = data_location[0]["lat"]
        lon = data_location[0]["lon"]
    
        #####################################################################################

        # Weather API call
        url_weather = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key_OpenWeather}&units=imperial"

        # Weather API response and JSON data
        response_weather = requests.get(url_weather)
        data_weather = response_weather.json()

        # Weather conditions
        conditions = data_weather["weather"][0]["main"]
        feels_like_farenheit = data_weather["main"]["feels_like"]

        #####################################################################################

        # Yelp API parameter -> indoor vs outdoor events based on weather
        term = ""
        if conditions in ["Clouds", "Rain", "Snow", "Thunderstorm", "Drizzle"] or feels_like_farenheit < 55:
            term = "indoor"
        else:
            term = "outdoor"

        # Yelp API call
        url_travel = f"https://api.yelp.com/v3/businesses/search?term={term}&latitude={lat}&longitude={lon}"
        # Yelp API headers

        api_key_Yelp = os.getenv('YELP_API_KEY')

        headers = {
            "accept": "application/json",
            "Authorization": f"Bearer {api_key_Yelp}"
        }

        # Yelp API response and JSON data
        response_travel = requests.get(url_travel, headers=headers)
        data_travel = response_travel.json()

        for business in data_travel["businesses"]:
            print(business["name"])
            
        return jsonify({'latitude': lat, 'longitude': lon})
    else:
        return jsonify({'error': 'Location not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)

"""

#from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route('/location', methods=['POST'])
def get_location():
    data = request.json
    city = data.get('city')
    if not city:
        return jsonify({'error': 'City is required'}), 400

    api_key_OpenWeather = os.getenv('WEATHER_API_KEY')
    url_location = f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={api_key_OpenWeather}"

    try:
        response_location = requests.get(url_location)
        response_location.raise_for_status()  # Raises exception for 4XX/5XX errors
        data_location = response_location.json()
        if not data_location:
            return jsonify({'error': 'Location not found'}), 404

        lat, lon = data_location[0]["lat"], data_location[0]["lon"]

        url_weather = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key_OpenWeather}&units=imperial"
        response_weather = requests.get(url_weather)
        response_weather.raise_for_status()
        data_weather = response_weather.json()

        conditions = data_weather["weather"][0]["main"]
        feels_like_farenheit = data_weather["main"]["feels_like"]

        term = "indoor" if conditions in ["Clouds", "Rain", "Snow", "Thunderstorm", "Drizzle"] or feels_like_farenheit < 55 else "outdoor"
        api_key_Yelp = os.getenv('YELP_API_KEY')
        headers = {"accept": "application/json", "Authorization": f"Bearer {api_key_Yelp}"}
        url_travel = f"https://api.yelp.com/v3/businesses/search?term={term}&latitude={lat}&longitude={lon}"
        response_travel = requests.get(url_travel, headers=headers)
        response_travel.raise_for_status()
        data_travel = response_travel.json()

        # Structure for the frontend
        results = {
            'location': {'latitude': lat, 'longitude': lon},
            'weather': {
                'conditions': conditions,
                'feels_like_farenheit': feels_like_farenheit
            },
            'events': data_travel['businesses']
        }
        return jsonify(results)
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
