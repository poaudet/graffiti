import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { albumsBelowFullHealth, avgHealth } from './libraryHealth.js'

test('filters albums by their displayed average health and retains their tracks', () => {
  const incomplete = { name: 'Incomplete', tracks: [{ health: 80 }, { health: 100 }, { health: null }] }
  const zero = { name: 'Zero', tracks: [{ health: 0 }] }
  const library = [
    { artist: 'Mixed', albums: [incomplete, zero, { name: 'Complete', tracks: [{ health: 100 }] }] },
    { artist: 'Unknown', albums: [{ name: 'Unscored', tracks: [{ health: null }, {}] }] },
    { artist: 'Empty', albums: [{ name: 'Empty', tracks: [] }] },
  ]

  assert.deepEqual(albumsBelowFullHealth(library), [{ artist: 'Mixed', albums: [incomplete, zero] }])
  assert.equal(library[0].albums.length, 3)
})

test('uses the rounded displayed average and excludes unscored albums', () => {
  assert.equal(avgHealth([{ health: 99 }, { health: 100 }]), 100)
  assert.equal(avgHealth([{ health: null }, {}]), null)
  assert.deepEqual(albumsBelowFullHealth([
    { artist: 'Rounded', albums: [{ tracks: [{ health: 99 }, { health: 100 }] }] },
  ]), [])
})
