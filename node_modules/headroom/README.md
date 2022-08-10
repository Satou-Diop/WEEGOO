# Head Room

[![Latest version](https://img.shields.io/npm/v/headroom.svg)](https://npm.im/headroom)
![npm downloads](https://img.shields.io/npm/dt/headroom.svg)
[![License](https://img.shields.io/github/license/kidonng/headroom.svg)](LICENSE)

Minimal implementation of [headroom.js](https://github.com/WickyNilliams/headroom.js) ([demo](https://codesandbox.io/s/headroom-demo-0lgux)).

## Install

### Package Managers

- `npm i headroom`
- `yarn add headroom`

### ES Modules

- `import { headroom } from 'https://cdn.jsdelivr.net/npm/headroom'`
- `import { headroom } from 'https://unpkg.com/headroom'`

## Usage

**NOTE** Default style doesn't deal with `z-index` hassles.

```js
import { headroom } from 'headroom'

// Selector
headroom('header')

// Default selector is `.headroom`
headroom()

// Element
headroom(document.querySelector('header'))

// Default options
const stop = headroom('.headroom', {
  // Use default style (https://github.com/kidonng/headroom/blob/master/index.ts#L10-L25)
  useStyle: true,
  // Debounce wait
  wait: 50
})
// Stop listening
stop()
```
