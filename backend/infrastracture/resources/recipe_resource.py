from flask_restx import Resource
from flask import request, jsonify, Response 
import json
class RecipeResource(Resource):
    def __init__(self, *args, recipe_service, **kwargs):
        self.recipe_service = recipe_service

    def post(self):
        try:
            body = request.json
            self.recipe_service.create_recipe(body=body)

        except Exception as e:
            print(f"error==>{e}")

    def get(self):
        try:
            recipe_id = request.args.get()
            return self.recipe_service.get_recipe(recipe_id)

        except Exception as e:
            print(f"error==>{e}")


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
            res.headers['Accept']= 'application/json'
            res.headers['Access-Control-Allow-Origin'] = '*'
            res.headers['Access-Control-Allow-Headers'] = 'Content-Type, Origin, Accept'
            return {"test":1}

        except Exception as e:
            print(f"error==>{e}")
