# NextTick

  Flush your callbacks on the next event loop tick

## Usage

  Installation using rawgit (temporary):

```js
import nextTick from 'https://cdn.rawgit.com/LosMaquios/next-tick/5d167294/index.js'

nextTick(() => {
  console.log('Something deferred')
})
```

## API Reference

<details>
  <summary><strong>nextTick(callback)</strong></summary>

  <p>Defers execution of a given callback</p>
</details>

<details>
  <summary>nextTick<strong>.waiting</strong></summary>

  <p>A boolean indicating when we are waiting to flush callbacks</p>
</details>

<details>
  <summary>nextTick<strong>.queue</strong></summary>

  <p>An array containing callbacks to be flushed</p>
</details>

<details>
  <summary>nextTick<strong>.flush()</strong></summary>

  <p>Flush callbacks as a single microtask</p>
</details>

<details>
  <summary>nextTick<strong>.afterFlush(callback)</strong></summary>

  <p>Execute (as a macrotask) a callback after flushing the queue</p>
</details>
