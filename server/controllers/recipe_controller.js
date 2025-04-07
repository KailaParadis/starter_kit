import Recipe from "../models/recipe.js";

export const getAllRecipes = (req, res) => {
    Recipe.find()
    .then((results) => {
        res.json(results);
    })
    .catch((error) => {
        res.status(500).json({ message: "Error Fetching Recipes", error });
    });
};

export const createRecipe = (req, res) => {
    const { name, description, difficulty, ingredients, steps } = req.body;
    const newRecipe = new Recipe({
        name, 
        description, 
        difficulty, 
        ingredients, 
        steps
    });

    newRecipe
    .save()
    .then((result) => res.status(201).json({ message: "Recipe Saved!", recipe: result}))
    .catch((error) => res.status(500).json({ message: "Error Creating New recipe", error }));
};

export const getRecipeById = (req, res) => {
    Recipe.findById(req.params.id)
    .then((results) => {
        if(!results) {
            res.status(404).json({ message: "Recipe Not Found.. :/" });
        }
        res.json(results);
    })
    .catch((error) => res.status(500).json({ message: "Error fetching recipe", error }));
};

export const updateRecipe = (req, res) => {
    const { name, description, difficulty, ingredients, steps } =  req.body;

    Recipe.findByIdAndUpdate(
        req.params.id,
        { name, description, difficulty, ingredients, steps },
        { new: true, runValidators: true }
    )
    .then((updateRecipe) => {
        if(!updateRecipe) {
            res.status(404).json({ message: "Recipe Not Found... :/" });
        }
        res.json({ message: "Successfully Updated Recipe: ", updateRecipe });
    })
    .catch((error) => res.status(500).json({ message: "Error updating recipe", error }));
};

export const deleteRecipe = (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
    .then((deletedRecipe) => {
        if(!deletedRecipe) {
           res.status(404).json({ message: "Recipe Not Found... :/" });
        }
        res.json({ mesasge: "Recipe Deleted!" });
    })
    .catch((error) => res.status(500).json({ message: "Error Deleteing, Unsuccessful.", error }));
};