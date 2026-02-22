Questions To Be Answered:

1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

2. How do you create and insert a new element into the DOM?

3. What is Event Bubbling? And how does it work?

4. What is Event Delegation in JavaScript? Why is it useful?

5. What is the difference between preventDefault() and stopPropagation() methods?

------------------------------------------------------------------------------

My Answers:

1. getElementById: This can select one specific element using its id. This method is only for ID.

getElementsByClassName: It selects all elements that have similar class name.

querySelector / querySelectorAll: this selector employ standard CSS selector syntax (like .class, #id, div > p). They are very adaptable but a bit slower because of the complexity involved in parsing CSS rules.

2. We use the createElement() method to create a new node. At this point, the element is present in JavaScript but is not visible on the page yet.
To show the element, we use append() / appendChild():, that inserts the element as the last child of a parent.

3. Event Bubbling is a process where an event that occurs on a certain element moves up through its parent elements in the DOM tree, activating their event handlers one after another.

When an interaction takes place, the browser adheres to a standard Event Propagation method:

Capturing Phase: The event begins at the top (the window) and moves down to the target element.

Target Phase: The event arrives at the specific element interacted with.

Bubbling Phase (Default): The event goes back up from the target element to the root. Most developers only work with this phase since addEventListener uses it by default.

4. Event Delegation is a technique where we can set up one event listener on a parent element instead of putting separate listeners on each child element.

Due to Event Bubbling, any event on a child will 'bubble up' to the parent, where the single listener captures it and determines which child was clicked using event.target.

This is useful because-
Memory Efficiency: Having one listener on a <ul> with 1,000 <li> items uses much less memory than having 1,000 individual listeners.

Dynamic Elements: If we add new child elements dynamically with JavaScript, they will automatically have the event functionality without needing to set up new listeners manually.

Cleaner Code: This approach minimizes boilerplate code and simplifies the management of complex interfaces.

5. Although both methods "stop" certain actions, they target entirely different behaviors in the browser.
(i). preventDefault()
This method halts the browser's default action linked to an event. However, it does not prevent the event from ascending the DOM tree.

(ii). stopPropagation()
This method prevents the event from bubbling up to its parent elements. The default behavior of the browser will still take place.