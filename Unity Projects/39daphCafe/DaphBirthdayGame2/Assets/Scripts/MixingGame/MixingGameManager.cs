using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MixingGameManager : MonoBehaviour
{

    public static MixingGameManager Instance;
    // Start is called before the first frame update

    /// <summary>
    /// All recipes
    /// </summary>
    public Dictionary<string, Recipe> RecipeBook = new Dictionary<string, Recipe>();

    /// <summary>
    /// Ingredients currently in the cup
    /// </summary>
    public Dictionary<IngredientType, int> CurrentIngredients;


    /// <summary>
    /// The current recipe
    /// </summary>
    public Recipe CurrentRecipe;
    
    void Awake()
    {
        Instance = this;
    }
    void Start()
    {
        CurrentIngredients = new Dictionary<IngredientType, int>();

        Recipe recipe = new Recipe("The Everything Once Boba Tea");
        recipe.AddIngredient(IngredientType.Tea, 1);
        recipe.AddIngredient(IngredientType.Milk, 1);
        recipe.AddIngredient(IngredientType.Syrup, 1);
        recipe.AddIngredient(IngredientType.Boba, 1);
        recipe.AddIngredient(IngredientType.Ice, 1);
        recipe.AddIngredient(IngredientType.Sweets, 1);
        recipe.AddIngredient(IngredientType.Flavoring, 1);
        recipe.AddIngredient(IngredientType.Powder, 1);

        //TODO: New recipes can be added here. It's not as pretty as planned but it works

        RecipeBook.Add(recipe.name, recipe);
        NewOrder("The Everything Once Boba Tea"); //remove this later
        NewCup();
    }


    /// <summary>
    /// Adds an Ingredient to the Drink
    /// </summary>
    /// <param name="type"></param>
    public void AddIngredient(IngredientType type)
    {
        int count = 0;
        if(CurrentIngredients.TryGetValue(type, out count))
        {
            CurrentIngredients[type] = count + 1;
        }
        else
        {
            CurrentIngredients.Add(type, 1);
        }

        Debug.Log(type + " added to drink. Total: " + CurrentIngredients[type]);

    }

    /// <summary>
    /// Called when the player drags the Cup over the customer
    /// </summary>
    public void ServeCustomer()
    {
        //calculate score TODO
        Debug.Log("Served Customer:");

        int score = 0;

        foreach (KeyValuePair<IngredientType, int> ingredient in CurrentIngredients) //For each ingredient the player put in the cup
        {
            if (CurrentRecipe.Ingredients.TryGetValue(ingredient.Key, out int recipeAmount)) //check if the recipe has that ingredient
            {
                {
                    if (ingredient.Value <= recipeAmount) //if less or correct amount
                    {
                        score += ingredient.Value; //add based on amt. Missing ingredients does not result in minus
                    } else
                    {
                        int difference = ingredient.Value - recipeAmount;
                        score += recipeAmount - difference; //
                        
                    }
                }
            } else { //if not, - per ingredient;

                score -= ingredient.Value;
            }

        }

        score = Mathf.Clamp(score, 0, CurrentRecipe.MaxScore);

        float percentage = (float)score / (float)CurrentRecipe.MaxScore * 100;

        Debug.Log("Score: " + score + " out of " + CurrentRecipe.MaxScore + " (" + percentage + "%)");

        NewCup();
    }
    

    /// <summary>
    /// Called when a new Order comes in
    /// </summary>
    public void NewOrder(string recipeName)
    {

        RecipeBook.TryGetValue(recipeName, out CurrentRecipe);
        Debug.Log("New Order: " + CurrentRecipe.name);
    }

    /// <summary>
    /// Called when the player resets the cup or when an new Order comes in
    /// </summary>
    public void NewCup()
    {
        CurrentIngredients.Clear();
        Debug.Log("New Cup");
    }
    
}
