/**
 * Resolved promise to schedule new microtasks
 *
 * @type {Promise}
 *
 * @api private
 */
const resolved = Promise.resolve()

/**
 * Queue of callbacks to be flushed
 *
 * @type {Array}
 *
 * @api public
 */
const queue = nextTick.queue = []

/**
 * Defers execution of a given `callback`
 *
 * @param {Function} callback - Function to be deferred
 *
 * @return void
 *
 * @api public
 */
export default function nextTick (callback) {
  if (!nextTick.waiting) {
    // Always flushing in a microtask
    resolved.then(nextTick.flush)
  }

  queue.push(callback)
}

/**
 * Determines when we are waiting to flush the queue
 *
 * @type {boolean}
 *
 * @api public
 */
Object.defineProperty(nextTick, 'waiting', {
  enumerable: true,
  get () {
    return queue.length > 0
  }
})

/**
 * Defers a callback to be called
 * after flush the queue
 *
 * @param {Function} callback
 *
 * @return void
 */
nextTick.afterFlush = callback => {
  setTimeout(() => {
    if (!nextTick.waiting) return callback()

    // If we are waiting, then re-schedule call
    nextTick.afterFlush(callback)
  })
}

/**
 * Flushes the actual queue
 *
 * @return {boolean}
 */
nextTick.flush = () => {
  if (nextTick.waiting) {
    const callbacks = queue.slice()

    // Empty actual queue
    queue.length = 0

    for (const callback of callbacks) {
      callback()
    }
  }
}
