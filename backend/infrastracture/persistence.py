import os
import pymongo        


class MongoDatabase:
    def __init__(self):
        self.db_client = None
        self.db_name = 'RecipeBookDB'
        self.host_url = os.getenv('MONGO_CLIENT_URL')

        self.create_db_connection()

    def create_db_connection(self):
        self.db_client = pymongo.MongoClient(self.host_url)
        self.db_client[self.db_name]

    def get_database(self):
        return self.db_client[self.db_name]

    def get_collection(self, collection_name):
        return self.get_database()[collection_name]

    def insert_one(self, collection_name, doc):
        collection = self.get_collection(collection_name)
        return collection.insert_one(doc)

    def insert_many(self, collection_name, docs):
        return self.get_collection(collection_name).insert_many(docs).inserted_ids

    def find_one(self, collection_name, filter, projection=None):
        return self.get_collection(collection_name).find_one(filter, projection)

    def find(self, collection_name, filter, projection=None):
        return list(self.get_collection(collection_name).find(filter, projection))

    def update_one(self, collection_name, filter, update, upsert=False):
        return self.get_collection(collection_name).update_one(filter, update, upsert=upsert).modified_count

    def update_many(self, collection_name, filter, update, upsert=False):
        return self.get_collection(collection_name).update_many(filter, update, upsert=upsert).modified_count

    def delete_one(self, collection_name, filter):
        return self.get_collection(collection_name).delete_one(filter).deleted_count

    def delete_many(self, collection_name, filter):
        return self.get_collection(collection_name).delete_many(filter).deleted_count
