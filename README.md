# Switch - sticky focus

Ensure focused element is not under a sticky bar

---

This plugin is written in ES2015 and available either in uncompiled form in the `/lib` folder or compiled for ES5 in the `/dist` folder. If your project uses babel with Webpack or Rollup, you should change the exclusion so this plugin gets compiled or force Webpack or Rollup to fetch the compiled version by using the `main` entry of the `package.json` file instead of the `module` entry.

```js
// .babelrc file or configuration within webpack or rollup
{
  "plugins": [...],
  "exclude": "node_modules/!(@switch-company)/**",
}
```

## Installation

```bash
$ npm install @switch-company/sticky-focus
```

## Usage

```js
import stickyFocus from '@switch-company/sticky-focus';

const sticky = new stickyFocus({
  elements,
  padding
});
```

## Parameters

## Mandatory parameter

| Name            | Type                | Description |
|-----------------|---------------------|-------------|
| `elements`      | `Array`             | Array of `HTMLElement` that are the sticky elements |

## Optional parameter

| Name            | Type                | Description |
|-----------------|---------------------|-------------|
| `padding`       | `Number`            | Number of pixels to add between the bottom of the sticky element and the top of the focused element |

## Methods

| Name                 | Description |
|----------------------|-------------|
| `refresh()`          | Force recalculate the size of the sticky element. Handy if the size changes between breakpoints |
| `restart( elements )` | Restart listening to the focus events. Pass `element` if you want to restart the plugin with different elements |
| `stop()`             | Stop listening to the focus events |
| `update( elements )` | Change the array of elements |
