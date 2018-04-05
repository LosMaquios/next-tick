import test from 'ava'
import nextTick from '.'

// TODO: Use sinon (spies, stubs...)

test.todo('test edge cases')

test.cb('callback into next tick', t => {
  t.plan(5)

  nextTick(() => {
    t.is(callID, 0x123, '`callID` should be 0x123')

    t.is(nextTick.queue.length, 0, '`nextTick.queue.length` should be 0')
    t.false(nextTick.waiting, '`nextTick.waiting` should be false')

    t.end()
  })

  let callID = 0x123

  t.is(nextTick.queue.length, 1, '`nextTick.queue.length` should be 1')
  t.true(nextTick.waiting, '`nextTick.waiting` should be true')
})

test.cb('callback after flush', t => {
  t.plan(3)

  let calls = 0

  const incrementCalls = () => calls += 1

  nextTick.afterFlush(() => {
    t.is(calls, 3, '`calls` should be 3')
    t.end()
  })

  nextTick(incrementCalls)
  nextTick(incrementCalls)
  nextTick(incrementCalls)
})

test('flushing callbacks', t => {
  t.plan(1)

  let string = ''

  nextTick(() => {
    string += 'called'
  })

  nextTick(() => {
    string += ' 2 times'
  })

  nextTick.flush()

  t.is(string, 'called 2 times', '`string` should be "called 2 times"')
})
