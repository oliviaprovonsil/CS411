from pymongo import MongoClient
from bson.objectid import ObjectId
import ssl

client = MongoClient()

username = 'pranitd23'
password = 'pranit17'
cluster_url = 'mongodb+srv://pranitd23:*****@weatherTravel.plxzhdv.mongodb.net/'
db_name = 'test'

# Create a MongoClient to the running mongod instance.
client = MongoClient('mongodb+srv://pranitd23:pranit17@weather-project.plxzhdv.mongodb.net/{db_name}?retryWrites=true&w=majority',  tls=True, tlsAllowInvalidCertificates=True)

db = client[db_name]
collection = db['test'] 

doc_id = '65e674b3d6991dd55130b033' 
document = collection.find_one({'_id': ObjectId(doc_id)})

# Print the result.
if document:
    print(document)
else:
    print('No document found with that _id.')
