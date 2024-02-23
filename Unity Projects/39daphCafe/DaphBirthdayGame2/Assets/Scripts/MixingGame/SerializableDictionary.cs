using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class IngredientDictionary<TKey, TValue> : Dictionary<TKey, TValue>, ISerializationCallbackReceiver
{
	[SerializeField]
	private List<TKey> Ingredient = new List<TKey>();

	[SerializeField]
	private List<TValue> Amount = new List<TValue>();

	// save the dictionary to lists
	public void OnBeforeSerialize()
	{
		Ingredient.Clear();
		Amount.Clear();
		foreach (KeyValuePair<TKey, TValue> pair in this)
		{
			Ingredient.Add(pair.Key);
			Amount.Add(pair.Value);
		}
	}

	// load dictionary from lists
	public void OnAfterDeserialize()
	{
		this.Clear();

		if (Ingredient.Count != Amount.Count)
			throw new System.Exception(string.Format("there are {0} keys and {1} values after deserialization. Make sure that both key and value types are serializable."));

		for (int i = 0; i < Ingredient.Count; i++)
            this.Add(Ingredient[i], Amount[i]);
    }
}