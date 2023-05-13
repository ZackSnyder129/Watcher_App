from pymongo import MongoClient

client = MongoClient("mongodb+srv://kapil21102:fMDXpJ67WOjYw1IC@cluster0.6lszuaj.mongodb.net/")

db = client.complete_database

collection_name = db["license_plates"]

second_collection_name = db["Criminal_Database"]

third_collection_name = db["Authorization"]