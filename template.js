// template.js
import {runBuildTask} from './lib/build.js'
import {serve as serveServer} from './lib/serve.js'
import {gen} from './lib/gen.js'
import {copyPublicToDist, emptyDistFolder} from './lib/files.js'
import process from 'node:process'

// Expose la fonction serve pour le CLI
export async function serve() {
  if (process.argv.includes('--build')) {
    await emptyDistFolder()
    await runBuildTask()
    await copyPublicToDist()
    process.exit(0)
  } else if (process.argv.includes('--gen')) {
    await gen()
  } else {
    await serveServer()
  }
}

// Lancer immédiatement si le fichier est exécuté directement
if (process.argv[1] === new URL(import.meta.url).pathname) {
  serve().catch(error => {
    console.error('An error occurred:', error)
    process.exit(1)
  })
}
