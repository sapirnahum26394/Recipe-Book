from flask_restx import Resource
from flask import request, jsonify, Response
import json


class CommentResource(Resource):
    def __init__(self, *args, comment_service, **kwargs):
        self.comment_service = comment_service

    def put(self):
        ...

    def delete(self):
        ...



class CommentsListResource(Resource):
    def __init__(self, *args, comment_service, app, **kwargs):
        self.comment_service = comment_service
        self.app = app

    def get(self, recipe_id):
        try:
            comments = self.comment_service.get_comments_by_recipe_id(recipe_id)
            res = Response(
                response=json.dumps(comments),
                status=200,
                mimetype="application/json"
            )
            res.headers["Content-Type"] = "application/json"
            res.headers["Access-Control-Allow-Origi"] = "*"
            return res

        except Exception as e:
            return str(e), 409


    def post(self, recipe_id):
        try:
            body = request.json
            recipe = self.comment_service.add_comment_to_recipe(recipe_id, comment=body)
            return recipe, 200
        
        except Exception as e:
            return str(e), 409
