using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class Scoop : Ingredient
{
    public MouseOverOutline Additional;


    public override void OnPointerEnter(PointerEventData eventData)
    {
        Additional.ToggleOutline(1);
        base.OnPointerEnter(eventData);
    }

    public override void OnPointerExit(PointerEventData eventData)
    {


        Additional.ToggleOutline(0);
        base.OnPointerExit(eventData);

    }

    public override void OnDrag(PointerEventData eventData)
    {

        Additional.ToggleOutline(0);
        base.OnDrag(eventData);
      
    }

}
