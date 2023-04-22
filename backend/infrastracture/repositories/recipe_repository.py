from domain.models.recipe import Recipe

class RecipeRepository:
    def __init__(self, client):
        self.client = client
        self.collection_name = 'recipes'
    
    def create_recipe(self, recipe: Recipe):
        self.client.insert_one(self.collection_name, recipe.serialize())
        return recipe
    
    def update_recipe(self, recipe_id: str, recipe: dict):
        result = self.client.update_one(self.collection_name,
            {'_id': recipe_id},
            {'$set': recipe}
        )
        if result.matched_count == 0:
            raise Exception('Recipe not found')
        return self.client.find_one(self.collection_name, {'_id': recipe_id})
    
    def put_recipe(self, recipe: Recipe):
        result = self.client.replace_one(self.collection_name,
            {'_id': recipe.id},
            recipe.serialize(),
            upsert=True
        )
        if result.matched_count == 0:
            raise Exception('Recipe not found')
        return recipe.serialize()
    
    def delete_recipe(self, recipe_id):
        result = self.client.delete_one(self.collection_name, {'_id': recipe_id})
        if result == 0:
            raise Exception('recipe not found')
    
    def get_recipe(self, recipe_id):
        recipe_dict = self.client.find_one(self.collection_name, {'_id': recipe_id})
        if recipe_dict is None:
            raise Exception('recipe not found')
        return recipe_dict
    
    def get_recipes(self):
        recipes_list = self.client.find(self.collection_name, {})        
        return recipes_list

    def get_recipes_by_category(self, category):
        recipes_list = self.client.find(self.collection_name, {f'categories.{category}': True})
        return recipes_list
    
    def get_recipes_by_title(self, title):
        recipes_list = self.client.find(self.collection_name, {'title': {'$regex': title}})
        return recipes_list
    
    def add_comment_to_recipe(self, recipe_id, comment_id):
        result = self.client.update_one(self.collection_name,
            {'_id': recipe_id},
            {'$push': {'comments': comment_id}}
        )
        if result.matched_count == 0:
            raise Exception('Recipe not found')
        return True
    
    def delete_comment_from_recipe(self, recipe_id, comment_id):
        result = self.client.update_one(self.collection_name,
            {'_id': recipe_id},
            {'$pull': {'comments': comment_id}}
        )
        if result.matched_count == 0:
            raise Exception('Recipe not found')
        return True
    
