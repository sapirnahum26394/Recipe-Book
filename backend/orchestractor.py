from infrastracture.mongodb import MongoDatabase
from infrastracture.repositories.recipe_repository import RecipeRepository
from infrastracture.repositories.comment_repository import CommentRepository
from infrastracture.resources.comment_resource import CommentResource, CommentsListResource
from infrastracture.resources.recipe_resource import (RecipeResource, 
                                                      RecipesListResource, 
                                                      RecipesCategoriesResource,
                                                      RecipesSearchResource)
from application.services.recipe_service import RecipeService
from application.services.comment_service import CommentService
from flask import Flask
from flask_restx import Api
from flask_cors import CORS
# Api
app = Flask(__name__)
CORS(app)
# Repositories
mongo_client = MongoDatabase()
recipe_repository = RecipeRepository(mongo_client)
comment_repository = CommentRepository(mongo_client)

# Services
recipe_service = RecipeService(recipe_repository)
comment_service = CommentService(comment_repository, recipe_repository)
# Rounts
api = Api(app)
api.add_resource(RecipeResource,'/recipes/<recipe_id>',resource_class_kwargs={
                "recipe_service": recipe_service,
                "app": app
            })
api.add_resource(RecipesListResource,'/recipes',resource_class_kwargs={
                "recipe_service": recipe_service,
                "app": app
            })

api.add_resource(RecipesCategoriesResource,'/recipes/category/<category>',resource_class_kwargs={
                "recipe_service": recipe_service,
                "app": app
            })

api.add_resource(RecipesSearchResource,'/recipes/search/<text>',resource_class_kwargs={
                "recipe_service": recipe_service,
                "app": app
            })
api.add_resource(CommentResource,'/recipes/<recipe_id>/comments/<comment_id>',resource_class_kwargs={
                "comment_service": comment_service,
                "app": app
            })

api.add_resource(CommentsListResource,'/recipes/<recipe_id>/comments',resource_class_kwargs={
                "comment_service": comment_service,
                "app": app
            })

