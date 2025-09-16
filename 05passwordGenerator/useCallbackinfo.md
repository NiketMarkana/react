# `useCallback` — Explanation & Examples

> Quick summary: `useCallback` memoizes a function reference so React can reuse the same function instance across renders (until dependencies change). This helps avoid unnecessary re-renders when you pass functions as props.

---

## 1. Problem — Without `useCallback`

```jsx
import { useState } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  // ❌ This function is recreated on every render
  const handleClick = () => {
    console.log("Clicked!");
  };

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </>
  );
}

function Child({ onClick }) {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
}
```
🔎 What happens here?

Every time Parent re-renders (e.g., when count changes), React creates a new handleClick function.

Because a new function reference is passed to Child, React thinks the props changed → Child re-renders, even if it didn't need to.

You can observe this by the console.log("Child rendered") appearing on each parent update.
## 2. Solution — With useCallback
```jsx
import { useState, useCallback } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  // ✅ useCallback memoizes the function
  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []); // dependencies → function stays the same unless dependencies change

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </>
  );
}

function Child({ onClick }) {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
}
```

🔎 What changes here?

handleClick is cached (memoized) by useCallback.

On re-renders, as long as dependencies ([]) don't change, the same function reference is reused.

Because the prop reference stays the same, Child doesn't re-render unnecessarily.

## 3. Real-world pattern — React.memo + useCallback

When you combine React.memo and useCallback, you avoid child re-renders when only the parent state changes:
```jsx
import { useState, useCallback, memo } from "react";

const Child = memo(function Child({ onClick }) {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // memoized so the Child won't re-render when `count` changes
  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []); 

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Increment Count</button>
      <button onClick={() => setOther(o => o + 1)}>Change Other</button>
      <Child onClick={handleClick} />
    </>
  );
}
```

If handleClick was not memoized, Child would rerender when count changes.

With useCallback + React.memo, Child only rerenders when handleClick (or other props) actually changes.

## 4. When to use useCallback

✅ Use useCallback when:

You pass functions as props to child components (especially children wrapped with React.memo).

A function is a dependency of useEffect, useMemo, or another hook, and you want to avoid re-triggering when not needed.

Creating the function is expensive (rare), or re-rendering the child is costly.

❌ Don't overuse: useCallback has small memory and runtime overhead. If the child isn't memoized and re-renders are cheap, it's fine to skip it.

## 5. useMemo vs useCallback

useMemo → memoizes the result/value of a function:
```jsx
const value = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

useCallback → memoizes the function itself (the reference):
```jsx
const fn = useCallback(() => doSomething(a, b), [a, b]);
```


Use useMemo when you need to avoid recomputing values. Use useCallback when you need to keep a stable function reference.

## 6. Examples of dependency arrays

If your callback references state/props, include them in the deps so the function updates when they change:
```jsx
const handleAdd = useCallback(() => {
  setCount(prev => prev + amount);
}, [amount]); // function updates when `amount` changes
```

If you use an empty array [], the function never changes (until component unmounts).

## 7. Quick checklist

✅ Child is wrapped with React.memo and receives function props → consider useCallback.

✅ Function used in useEffect deps → use useCallback to avoid infinite loops or unnecessary effect runs.

❌ Simple apps with small components — you can skip premature optimization.

## 8. Final one-line mental model

Think of useCallback as:

"Only give me the same function again unless my dependencies change."

## 9. Minimal reference snippet (pasteable)
```jsx
// Parent.jsx
import { useState, useCallback } from "react";
import Child from "./Child";

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []);

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Inc</button>
      <Child onClick={handleClick} />
    </>
  );
}

export default Parent;

// Child.jsx
import React from "react";

function Child({ onClick }) {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
}

export default React.memo(Child);
---
``` 
