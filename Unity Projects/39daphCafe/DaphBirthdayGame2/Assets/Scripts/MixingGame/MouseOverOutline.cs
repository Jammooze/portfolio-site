using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

/// <summary>
/// Script that activates the outline of an object when the mouse hovers over it.
/// </summary>
public class MouseOverOutline : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
{



    public  void OnPointerEnter(PointerEventData eventData)
    {
        ToggleOutline(1);
    }

    public  void OnPointerExit(PointerEventData eventData)
    {
        ToggleOutline(0);
    }


    public void ToggleOutline(int t)
    {
        GetComponent<Renderer>().material.SetInt("_OutlineActive", t);
    }

}
