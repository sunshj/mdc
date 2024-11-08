### Heading

::code-group
::div{label="Preview" style="padding:10px"}

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

::

```md [Code]
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

::

### Link

::code-group
::div{label="Preview" style="padding:10px"}
  [Internal Link](/play)<br/>
  [External Link](https://github.com/sunshj/mdc)
::

```md [Code]
[Internal Link](/play)
[External Link](https://github.com/sunshj/mdc)
```

::

### Blockquote

::code-group
::div{label="Preview" style="padding:10px"}

> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

::

```md [Code]
> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

::

### Code Block

::code-group
::div{label="Preview" style="padding:10px"}

```ts
export default () => {
  console.log('Code block')
}
```

```ts [With Title]
export default () => {
  console.log('Code block')
}
```

```ts{2} [Highlight Lines]
export default () => {
  console.log('Code block');
};
```

```ts [Diff Lines]
export default () => {
  console.log('Code blcok') // [!code --]
  console.log('Code block') // [!code ++]
}
```

::

````mdc [Code]
```ts
export default () => {
  console.log('Code block')
}
```

```ts [With Title]
export default () => {
  console.log('Code block')
}
```

```ts{2} [Highlight Lines]
export default () => {
  console.log('Code block');
};
```

```ts [Diff Lines]
export default () => {
  console.log('Code blcok') // [!code --]
  console.log('Code block') // [!code ++]
}
```
````

::

### Code Group

::code-group
  ::div{label="Preview" style="padding:10px"}
    ::code-group
      ```bash [npm]
      npm run dev
      ```

      ```bash [pnpm]
      pnpm dev
      ```

      ```bash [yarn]
      yarn dev
      ```

      ```bash [bun]
      bun run dev
      ```
    ::
  ::

  ```mdc [Code]
  ::code-group
    ```bash [npm]
    npm run dev
    ```

    ```bash [pnpm]
    pnpm dev
    ```

    ```bash [yarn]
    yarn dev
    ```

    ```bash [bun]
    bun run dev
    ```
  ::
  ```
::

### Inline Code

::code-group
::div{label="Preview" style="padding:10px"}
`code inline`

`const codeInline: string = 'highlighted code inline'`{lang="ts"}
::

```md [Code]
`code inline`

`const codeInline: string = 'highlighted code inline'`{lang="ts"}
```

::

### Horizontal Rule

::code-group
::div{label="Preview" style="padding:10px"}
Before

---

After
::

```md [Code]
Before

---

After
```

::

### Image

::code-group
::div{label="Preview" style="padding:10px"}
![Photo by Drew Beamer](https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80)
::

```md [Code]
![Photo by Drew Beamer](https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80)
```

::

### Unordered List

::code-group
::div{label="Preview" style="padding:10px"}

- Foo
- Bar
- Baz

::

```md [Code]
- Foo
- Bar
- Baz
```

::

### Ordered List

::code-group
::div{label="Preview" style="padding:10px"}

1. Foo
2. Bar
3. Baz

::

```md [Code]
1. Foo
2. Bar
3. Baz
```

::

### Paragraph

::code-group
::div{label="Preview" style="padding:10px"}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
::

```md [Code]
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

::

### Strong

::code-group
::div{label="Preview" style="padding:10px"}
**Just a strong paragraph.**
::

```md [Code]
**Just a strong paragraph.**
```

::

### Italic

::code-group
::div{label="Preview" style="padding:10px"}
_Just an italic paragraph._
::

```md [Code]
_Just an italic paragraph._
```

::

### Table

::code-group
::div{label="Preview" style="padding:10px"}
| Key | Type | Description |
| --- | --------- | ------------------------------------------- |
| 1 | Wonderful | Table with `some long code snippet example` |
| 2 | Wonderful | Data |
| 3 | Wonderful | Website |
::

```md [Code]
| Key | Type      | Description                                 |
| --- | --------- | ------------------------------------------- |
| 1   | Wonderful | Table with `some long code snippet example` |
| 2   | Wonderful | Data                                        |
| 3   | Wonderful | Website                                     |
```

::


### Strikethrough

::code-group
::div{label="Preview" style="padding:10px"}
~~Just a strikethrough paragraph.~~
::

```md [Code]
~~Just a strikethrough paragraph.~~
```

::

 
### Task List

::code-group
::div{label="Preview" style="padding:10px"}
- [x] Foo
- [ ] Bar
- [ ] Baz
::

```md [Code]
- [x] Foo
- [ ] Bar
- [ ] Baz
```

::



### Emoji

::code-group
::div{label="Preview" style="padding:10px"}
:smile:
:heart:
:rocket:
::

```md [Code]
:smile:
:heart:
:rocket:
```

::
 