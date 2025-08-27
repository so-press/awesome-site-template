import test from 'node:test'
import assert from 'node:assert/strict'
import {moveUseStatementsToTop} from '../lib/utils.js'

test('moveUseStatementsToTop moves @use lines to top', () => {
  const input = "body{}\n@use 'foo';\n@use 'bar';\n"
  const expected = "@use 'foo';\n@use 'bar';\nbody{}\n"
  assert.equal(moveUseStatementsToTop(input), expected)
})
