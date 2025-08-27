import fs from 'node:fs'
import path from 'node:path'
import {distBase, srcBase} from './config.js'

/**
 * Concatène tous les fichiers JavaScript du dossier source vers dist/scripts.js.
 *
 * - Crée le dossier `src` s'il n'existe pas.
 * - Si le dossier `src` est vide, n'effectue aucune action.
 * - Conserve le chemin relatif de chaque fichier comme commentaire dans la sortie.
 *
 * @return {void}
 */
export const concatenateJsFiles = () => {
  console.log('Compiling JavaScript...')

  if (!fs.existsSync(srcBase)) {
    console.log(`Source folder not found: ${srcBase}. Nothing to do yet.`)
    return
  }

  const isSrcEmpty = fs.readdirSync(srcBase).length === 0
  if (isSrcEmpty) {
    console.log('Source folder is empty. Nothing to do.')
    return
  }

  const jsFiles = listJsFiles(srcBase)
  if (jsFiles.length === 0) {
    console.log('No JavaScript files found to concatenate.')
    return
  }

  let concatenatedJs = ''
  let nb = 0

  for (const jsFilePath of jsFiles) {
    const jsComment = `/* ${path.relative(srcBase, jsFilePath)} */\n`
    const jsContent = fs.readFileSync(jsFilePath, 'utf8')
    concatenatedJs += jsComment + jsContent + '\n'
    nb++
  }

  fs.mkdirSync(distBase, {recursive: true})
  fs.writeFileSync(path.join(distBase, 'scripts.js'), concatenatedJs)

  console.log('   ... ' + nb + ' JS files compiled')
}

/**
 * Liste récursivement tous les fichiers .js dans un dossier et ses sous-dossiers,
 * en plaçant en priorité ceux dont le chemin contient "globals".
 *
 * @param {string} dir Dossier de recherche.
 * @return {string[]} Chemins absolus des fichiers .js trouvés.
 */
const listJsFiles = dir => {
  let jsFiles = []

  const files = fs.readdirSync(dir, {withFileTypes: true})

  for (const file of files) {
    const fullPath = path.join(dir, file.name)
    if (file.isDirectory()) {
      jsFiles = jsFiles.concat(listJsFiles(fullPath))
    } else if (file.isFile() && file.name.endsWith('.js')) {
      jsFiles.push(fullPath)
    }
  }

  jsFiles.sort((a, b) => {
    const aHasGlobals = a.includes('globals')
    const bHasGlobals = b.includes('globals')

    if (aHasGlobals && !bHasGlobals) {
      return -1
    }

    if (!aHasGlobals && bHasGlobals) {
      return 1
    }

    return a.localeCompare(b)
  })

  return jsFiles
}
