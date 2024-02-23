using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

/// <summary>
/// Base class for all ingredients
/// </summary>
public class Ingredient : DraggableObject {


    /// <summary>
    /// The type of ingredient this is.
    /// </summary>
    public IngredientType Type;




    public override void OnPointerUp(PointerEventData eventData)
    {

        if(aboveDropZone)
        {
            MixingGameManager.Instance.AddIngredient(Type);
        }

        base.OnPointerUp(eventData);

    }

    public override void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.tag == TargetTag) 
        {
            aboveDropZone = true;
            if(dragging)other.GetComponent<Renderer>().material.SetInt("_OutlineActive", 1);
        }
    }


    public override void OnTriggerExit2D(Collider2D other)
    {
        if (other.gameObject.tag == TargetTag) 
        {
            aboveDropZone = false;
            if (dragging) other.GetComponent<Renderer>().material.SetInt("_OutlineActive", 0);
        }
    }
}
