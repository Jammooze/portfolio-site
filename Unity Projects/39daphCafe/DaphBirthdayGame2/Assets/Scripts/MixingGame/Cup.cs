using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class Cup : DraggableObject
{

    private bool aboveSink;

    private bool aboveTea;

    public override void OnPointerUp(PointerEventData eventData)
    {

        if (aboveDropZone)
        {
            MixingGameManager.Instance.ServeCustomer();
            aboveDropZone = false;
        } else if(aboveSink)
        {
            Debug.Log("Dumped drink in sink");
            MixingGameManager.Instance.NewCup();
            aboveSink = false;
        } else if(aboveTea)
        {
            MixingGameManager.Instance.AddIngredient(IngredientType.Tea);
            aboveTea = false;
        }

        base.OnPointerUp(eventData);

    }


    public override void OnTriggerEnter2D(Collider2D other)
    {
        base.OnTriggerEnter2D(other);

        if (other.tag == "Sink")
        {
            aboveSink = true;
            other.GetComponent<MouseOverOutline>().ToggleOutline(1);
        }

        if (other.tag == "Tea")
        {
            aboveTea = true;
            other.GetComponent<MouseOverOutline>().ToggleOutline(1);
        }
    }


    public override void OnTriggerExit2D(Collider2D other)
    {
        base.OnTriggerExit2D(other);

        if (other.tag == "Sink")
        {
            aboveSink = false;
            other.GetComponent<MouseOverOutline>().ToggleOutline(0);

        }

        if (other.tag == "Tea")
        {
            aboveTea = false;
            other.GetComponent<MouseOverOutline>().ToggleOutline(0);
        }
    }
}
