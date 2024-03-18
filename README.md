# Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Code style guidelines

### Root functions

Use `function` instead of `const` syntax when declaring functions located on the file's root.

```tsx
// ❌
const MyReactComponent = () => {
  // ...

  const handleButtonClick = () => {
    // ...
  }
}

// ✅
function MyReactComponent() {
  // ...

  const handleButtonClick = () => {
    // ...
  }
}
```

**Why**

This is just a matter of preference, but it visually highlights which are root vs. inner functions, so it is easier to understand which functions are more suitable to be exported or where to start reading in larger files.

### No inline exports

As a general rule, do not use inline exports. Instead, put all exports at the end of the file.

```tsx
// ❌
export type MyComponentProps = {
  /* ... */
}

export function MyComponent(props: MyComponentProps) {
  // ...
}

// ✅
type MyComponentProps = {
  /* ... */
}

function MyComponent(props: MyComponentProps) {
  // ...
}

export type { MyComponentProps }
export { MyComponent }
```
