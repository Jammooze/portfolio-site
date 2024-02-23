using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

/// <summary>
/// Base class for all draggable objects.
/// </summary>
public class DraggableObject : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IDragHandler, IPointerDownHandler, IPointerUpHandler
{

    /// <summary>
    /// The tag of the object that this object can be dropped on.
    /// </summary>
    public string TargetTag;

    /// <summary>
    /// Required for drag and drop functionality
    /// </summary>
    public GameObject Dragger;
    
    /// <summary>
    /// InitialPosition
    /// </summary>
    private Vector3 initialPosition;

    /// <summary>
    /// RigidBody
    /// </summary>
    private Rigidbody2D body;

    /// <summary>
    /// Whether or not the object is above the drop zone.
    /// </summary>
    protected bool aboveDropZone = false;


    /// <summary>
    /// Whether or not the object is currently being dragged
    /// </summary>
    protected bool dragging = false;

    // Start is called before the first frame update
    void Start()
    {
        initialPosition = transform.position;
        body = GetComponent<Rigidbody2D>();
    }


    public virtual void OnDrag(PointerEventData eventData)
    {
        dragging = true;
        Vector3 pos = Camera.main.ScreenToWorldPoint(eventData.position);

        Dragger.transform.position = new Vector3(pos.x, pos.y, transform.position.z);
    }

    public virtual void OnPointerDown(PointerEventData eventData)
    {
        transform.position -= Vector3.forward*3; //Object we're currently moving is always on top
        Vector3 pos = Camera.main.ScreenToWorldPoint(eventData.position);
        Dragger.transform.position = new Vector3(pos.x, pos.y, transform.position.z);
    }

    public virtual void OnPointerEnter(PointerEventData eventData)
    {
        GetComponent<Renderer>().material.SetInt("_OutlineActive", 1);
    }

    public virtual void OnPointerExit(PointerEventData eventData)
    {
        GetComponent<Renderer>().material.SetInt("_OutlineActive", 0);
    }

    public virtual void OnPointerUp(PointerEventData eventData)
    {
        dragging = false;
        aboveDropZone = false;
        body.velocity = Vector2.zero;
        body.angularVelocity = 0;
        transform.position = initialPosition;
        transform.rotation = Quaternion.identity;
        Dragger.transform.localRotation = Quaternion.Euler(0, 0, 0);
    }

    public virtual void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.tag == TargetTag)
        {
            aboveDropZone = true;
        }
    }


    public virtual void OnTriggerExit2D(Collider2D other)
    {
        if (other.gameObject.tag == TargetTag) 
        {
            aboveDropZone = false;
        }
    }
}