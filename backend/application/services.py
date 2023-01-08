from flask import jsonify
from domain.models import Recipe

class RecipeService:
    def __init__(self, recipe_repository):
        self.recipe_repository = recipe_repository
    
    def create_recipe(self, body):
        recipe = Recipe(body)
        return self.recipe_repository.create_recipe(recipe)
    
    def get_recipe(self, recipe_id):
        return self.recipe_repository.get_recipe(recipe_id)
    
    def get_all_recipes(self):
        recipes_list = self.recipe_repository.get_recipes()
        recipes_list = [{'id': item['_id'], 'title': item['title'], 'image': item['image']} for item in recipes_list]
        return { "recipes": recipes_list }
