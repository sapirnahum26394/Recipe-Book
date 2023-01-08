from bson.objectid import ObjectId
from domain.models import Recipe

class RecipeRepository:
    def __init__(self, client):
        self.client = client
        self.collection_name = 'recipes'
    
    def create_recipe(self, recipe: Recipe):
        recipe_id = self.client.insert_one(self.collection_name, recipe.serialize())
        recipe.id = recipe_id
        return recipe
    
    def update_recipe(self, recipe: Recipe):
        result = self.client.update_one(self.collection_name,
            {'_id': ObjectId(recipe.id)},
            {'$set': recipe.to_dict()},
            upsert=True
        )
        if result == 0:
            raise ValueError('Recipe not found')
        return recipe
    
    def delete_recipe(self, recipe_id):
        result = self.client.delete_one(self.collection_name, {'_id': ObjectId(recipe_id)})
        if result == 0:
            raise ValueError('recipe not found')
    
    def get_recipe(self, recipe_id):
        recipe_dict = self.client.find_one(self.collection_name, {'_id': ObjectId(recipe_id)})
        if recipe_dict is None:
            raise ValueError('recipe not found')
        return recipe_dict.from_dict(recipe_dict)
    
    def get_recipes(self):
        recipes_list = self.client.find(self.collection_name, {})        
        return recipes_list

    def get_recipes_by_category(self, category):
        recipe_dicts = self.client.find(self.db_name, self.collection_name, {'categories': {'$in': category}})
        return [recipe_dicts.from_dict(recipe_dict) for recipe_dict in recipe_dicts]
    
    def get_recipes_by_title(self, title):
        recipe_dicts = self.client.find(self.db_name, self.collection_name, {'title': {'$regex': title}})
        return [recipe_dicts.from_dict(recipe_dict) for recipe_dict in recipe_dicts]
    