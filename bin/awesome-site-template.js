#!/usr/bin/env node
import process from 'node:process'
import {serve} from '../template.js'

try {
  await serve()
} catch (error) {
  console.error('CLI error:', error)
  process.exitCode = 1
}
