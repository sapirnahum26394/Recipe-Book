import uuid
class Recipe:
    def __init__(self, body):
        self.title: str = body['title']
        self.servings: int = body['servings']
        self.ingredients: list = body['ingredients']
        self.summary: str = body['summary']
        self.instractions: str = body['instractions']
        self.categories: dict = body['categories']
        self.image: str = body['image']
    
    def serialize(self):
        return {
            'title': self.title,
            'servings': self.servings,
            'ingredients': self.ingredients,
            'summary': self.summary,
            'instractions': self.instractions,
            'categories': self.categories,
            'image': self.image
        }
    
    @classmethod
    def deserialize(cls, data):
        return cls(data)
