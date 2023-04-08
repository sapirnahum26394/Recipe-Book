import uuid


class Comment:
    def __init__(self, body):
        self.id: str = body.get('_id', str(uuid.uuid4()))
        self.author: str = body['author']
        self.text: str = body['text']
        self.date: str = body['date']

    def serialize(self):
        return {
            '_id': self.id,
            'author': self.author,
            'text': self.text,
            'date': self.date
        }

    @classmethod
    def deserialize(cls, data):
        return cls(data)
