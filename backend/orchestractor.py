from infrastracture.persistence import MongoDatabase
from infrastracture.repositories.recipe_repository import RecipeRepository
from application.services import RecipeService
from flask import Flask
from domain.models import Recipe
from infrastracture.resources.recipe_resource import RecipeResource, RecipesListResource
from flask_restx import Api

# Api
app = Flask(__name__)
# Repositories
mongo_client = MongoDatabase()
recipe_repository = RecipeRepository(mongo_client)

# Services
recipe_service = RecipeService(recipe_repository)

# 
# Rounts
api = Api(app)
api.add_resource(RecipeResource,'/recipes/create',resource_class_kwargs={
                "recipe_service": recipe_service,
                "app": app
            })
api.add_resource(RecipesListResource,'/recipes',resource_class_kwargs={
                "recipe_service": recipe_service,
                "app": app
            })


# Publishing services

# Validators

# Application
