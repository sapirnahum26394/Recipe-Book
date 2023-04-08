from flask_restx import Resource
from flask import request, jsonify, Response 
import json
class RecipeResource(Resource):
    def __init__(self, *args, recipe_service, **kwargs):
        self.recipe_service = recipe_service

    def get(self, recipe_id):
        try:
            return self.recipe_service.get_recipe(recipe_id), 200
        except Exception as e:
            return str(e), 409

    def patch(self, recipe_id):
        try:
            body = request.json
            return self.recipe_service.update_recipe(recipe_id, body), 200
        except Exception as e:
            return str(e), 409
    
    def put(self, recipe_id):
        try:
            body = request.json
            return self.recipe_service.put_recipe(recipe_id, body), 200
        except Exception as e:
            return str(e), 409

    def delete(self,recipe_id):
        try:
            return self.recipe_service.delete_recipe(recipe_id), 200
        except Exception as e:
            return str(e), 409

class RecipesListResource(Resource):
    def __init__(self, *args, recipe_service, app, **kwargs):
        self.recipe_service = recipe_service
        self.app = app

    def get(self):
        try:
            recipes = self.recipe_service.get_all_recipes()
            res = Response(
                response=json.dumps(recipes),
                status=200,
                mimetype="application/json"
            )
            res.headers["Content-Type"] = "application/json"
            res.headers["Access-Control-Allow-Origi"] = "*"
            return res

        except Exception as e:
            return str(e), 409

    def post(self):
        try:
            body = request.json
            recipe = self.recipe_service.create_recipe(body=body)
            return recipe, 200
        
        except Exception as e:
            return str(e), 409