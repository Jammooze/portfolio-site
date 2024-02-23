using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class Recipe {

    public string name;
    
    public IngredientDictionary<IngredientType, int> Ingredients;

    public int MaxScore;

    public Recipe(string name)
    {
        this.name = name;
        Ingredients = new IngredientDictionary<IngredientType, int>();
    }

    public void AddIngredient(IngredientType type, int amount)
    {
            Ingredients.Add(type, amount);
        MaxScore += amount;
    }
}


