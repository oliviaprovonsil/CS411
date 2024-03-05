from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello World!'

#@app.route("weather-api")
#def getcoords(city_name,state_code,country_code,API_key):
#    resp = requests.get(f'http://api.openweathermap.org/geo/1.0/direct?q={city_name},{state_code},{country_code}&appid={API_key}')