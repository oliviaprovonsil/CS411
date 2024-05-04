#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Mar  4 16:52:04 2024

"""

import requests
import os
from dotenv import load_dotenv

load_dotenv()


""" FIND LATITUDE AND LONGITUDE OF LOCATION """
# Geocoding API parameters
city = "London"
limit = "1"

api_key_OpenWeather = os.getenv('WEATHER_API_KEY')
print(api_key_OpenWeather)

# Geocoding API call
url_location = f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit={limit}&appid={api_key_OpenWeather}"

# Geocoding API response and JSON data
response_location = requests.get(url_location)
data_location = response_location.json()
print(data_location)

# Store the latitude and longitude of the user-specified location
lat = data_location[0]["lat"]
lon = data_location[0]["lon"]

#####################################################################################

""" FIND WEATHER OF LOCATION USING LATITUDE AND LONGITUDE """
# Weather API call
url_weather = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key_OpenWeather}&units=imperial"

# Weather API response and JSON data
response_weather = requests.get(url_weather)
data_weather = response_weather.json()

# Weather conditions
conditions = data_weather["weather"][0]["main"]
feels_like_farenheit = data_weather["main"]["feels_like"]

#####################################################################################

""" FIND EVENTS NEAR LATITUDE AND LONGITUDE BASED ON WEATHER CONDITIONS """
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






