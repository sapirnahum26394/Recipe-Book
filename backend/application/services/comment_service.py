from flask import jsonify
from domain.models.comment import Comment


class CommentService:
    def __init__(self, comment_repository, recipe_repository):
        self.comment_repository = comment_repository
        self.recipe_repository = recipe_repository

    def add_comment_to_recipe(self, recipe_id, comment):
        comment = Comment(comment)
        self.recipe_repository.add_comment_to_recipe(recipe_id, comment.id)
        self.comment_repository.add_comment(comment)
        return comment.serialize()

    def get_comments_by_recipe_id(self, recipe_id):
        recipe = self.recipe_repository.get_recipe(recipe_id)
        comments_ids = recipe.get('comments', [])
        comments = self.comment_repository.get_comments(comments_ids)
        return {'comments': comments}
        
    def delete_comment(self, recipe_id, comment_id):
        self.recipe_repository.delete_comment_from_recipe(recipe_id, comment_id)
        self.comment_repository.delete_comment(comment_id)
        return {}

    def update_comment(self, comment_id, comment):
        self.comment_repository.update_comment(Comment(comment))
        return comment
