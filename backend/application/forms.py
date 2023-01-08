from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from domain.models import Recipe

class RecipeForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    ingridients = StringField('ingridients', validators=[DataRequired()])
    summary = StringField('summary', validators=[DataRequired()])
    instractions = StringField('instractions', validators=[DataRequired()])
    categories = StringField('categories')
    submit = SubmitField('Submit')
    
    def to_recipe(self):
        return Recipe(
            self.id.data, 
            self.title.data, 
            self.ingridients.data, 
            self.summary.data,
            self.instractions.data,
            self.categories.data
        )
    
    @classmethod
    def from_recipe(cls, recipe):
        form = cls()
        form.id.data = recipe.id
        form.title.data = recipe.title
        form.ingridients.data = recipe.ingridients
        form.summary.data = recipe.summary
        form.instractions.data = recipe.instractions
        form.categories.data = recipe.categories
        return form
