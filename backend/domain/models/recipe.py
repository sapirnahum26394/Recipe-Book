import uuid


class Recipe:
    def __init__(self, body):
        self.id: str = body.get('_id', str(uuid.uuid4()))
        self.title: str = body.get('title','')
        self.servings: int = body.get('servings',0)
        self.ingredients: list = body.get('ingredients',[])
        self.summary: str = body.get('summary','')
        self.instractions: str = body.get('instractions','')
        self.categories: list = body.get('categories',[])
        self.image: str = body.get('image','')
        self.comments: list = body.get('comments', [])
    
    def serialize(self):
        return {
            '_id': self.id,
            'title': self.title,
            'servings': self.servings,
            'ingredients': self.ingredients,
            'summary': self.summary,
            'instractions': self.instractions,
            'categories': self.categories,
            'image': self.image,
            'comments': self.comments
        }

    @classmethod
    def deserialize(cls, data):
        return cls(data)
