from domain.models.recipe import Recipe


class RecipeService:
    def __init__(self, recipe_repository):
        self.recipe_repository = recipe_repository

    def create_recipe(self, body):
        recipe = Recipe(body)
        return self.recipe_repository.create_recipe(recipe).serialize()

    def get_recipe(self, recipe_id):
        return self.recipe_repository.get_recipe(recipe_id)

    def get_all_recipes(self):
        recipes_list = self.recipe_repository.get_recipes()
        return {"recipes": recipes_list}
    
    def delete_recipe(self, recipe_id):
        return self.recipe_repository.delete_recipe(recipe_id)

    def update_recipe(self, recipe_id, body):
        body_id = body.get('_id')
        validate_id_mismatch = bool(recipe_id == body_id)
        if not validate_id_mismatch:
            raise Exception("mismatch recipe id")
        return self.recipe_repository.update_recipe(recipe_id, body)

    def put_recipe(self, recipe_id, body):
        body_id = body.get('_id')
        validate_id_mismatch = bool(recipe_id == body_id)
        if not validate_id_mismatch:
            raise Exception("mismatch recipe id")
        return self.recipe_repository.put_recipe(Recipe(body))
