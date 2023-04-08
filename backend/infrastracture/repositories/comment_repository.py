from bson.objectid import ObjectId
from domain.models.comment import Comment


class CommentRepository:
    def __init__(self, client):
        self.client = client
        self.collection_name = 'comments'

    def add_comment(self, comment: Comment):
        self.client.insert_one(self.collection_name, comment.serialize())

    def update_comment(self, comment: Comment):
        result = self.client.update_one(self.collection_name,
                                        {'_id': ObjectId(comment.id)},
                                        {'$set': comment.to_dict()},
                                        upsert=True
                                        )
        if result == 0:
            raise ValueError('Recipe not found')
        return comment

    def delete_comment(self, comment_id):
        result = self.client.delete_one(self.collection_name, {'_id': ObjectId(comment_id)})
        if result == 0:
            raise ValueError('recipe not found')

    def get_comments(self, comments_ids):
        comments_list = self.client.find(self.collection_name, {'_id': {'$in':comments_ids}})
        return comments_list
