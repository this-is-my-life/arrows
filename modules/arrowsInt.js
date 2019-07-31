const fs = require('fs')

/**
 * converted
 */
let converted = ''

/**
 * @param {any} test
 * @param {string} mode
 */
module.exports.interpret = (target, mode) => {
  /**
   * @todo description needed.
   */
  if (!target) {
    console.error('Err: Wrong execute!')
    return 1
  }
  
  /**
   * Flie not found
   */
  if (!fs.existsSync(target)) {
    console.error('Err: File NOT exist')
    return 1
  }
  
  let data = fs.readFileSync(target).toString('utf8')

  if (mode === 'wtf') {
    wtfConv(data)
    return 0
  } else {
    data.split('\n').forEach((line) => {
      conv(line)
    })
  
    if (!fs.existsSync('./tmp/')) {
      fs.mkdirSync('./tmp/')
    }
  
    fs.writeFileSync('./tmp/converted-' + Math.floor(Math.random() * 999999) + '.js', converted)
  
    converted = new Function(converted)
    return converted()
  }
}

function conv (line) {
  line = line.split('=>')[0]
  let arrowArray = line.split('<-')
  let cmd = arrowArray[0] ? arrowArray[0].trim().toLowerCase() : ''
  let arg0 = arrowArray[1] ? arrowArray[1].trim() : ''

  switch (cmd) {
    case 'modl':
      conv(fs.readFileSync(arg0).toString('utf8'))
      break;

    /**
     * console output
     */
    case 'con':
      converted += 'console.log(' + arg0 + ')'
      break;

    /**
     * console error output
     */
    case 'con.err':
      converted += 'console.error(' + arg0 + ')'
      break;

    /**
     * console dir output
     */
    case 'con.dir':
      converted += 'console.dir(' + arg0 + ')'
      break;

    /**
     * exit the program
     */
    case 'exit':
      converted += 'return ' + arg0
      break;

    /**
     * if statement
     */
    case 'if':
      converted += 'if (' + arg0 +') {'
      break;

    default:
      if (cmd && arg0) {
        converted += 'let ' + cmd + ' = ' + arg0
      }
      break;
  }

  if (line.endsWith('->')) converted += '}'
  converted += '\n'
}

/**
 * @param {String} data
 */
function wtfConv (data) {
  let point = 0

  /**
   * memory
   * @type {Array<Number>}
   */
  let memory = []
  data = data.split('\n').join(' ')
  data.split(' ').forEach((cnt) => {
    switch (cnt.trim()) {
      case '^+':
        point++
        break

      case '^-':
        point--
        break

      case '<+':
        if (!memory[point]) memory[point] = 0
        memory[point]++
        break

      case '<-':
        if (!memory[point]) memory[point] = 0
        memory[point]--
        break

      case '<+=':
        if (!memory[point]) memory[point] = 0
        memory[point] += memory[point]
        break

      case '<-=':
        if (!memory[point]) memory[point] = 0
        memory[point] += memory[point]
        break

      case '<*=':
        if (!memory[point]) memory[point] = 0
        memory[point] *= memory[point]
        break

      case '</=':
        if (!memory[point]) memory[point] = 0
        memory[point] /= memory[point]
        break

      case '<+^':
        if (!memory[point]) memory[point] = 0
        memory[point] += memory[point - 1]
        break

      case '<+_':
        if (!memory[point]) memory[point] = 0
        memory[point] += memory[point + 1]
        break

      case '<-^':
        if (!memory[point]) memory[point] = 0
        memory[point] -= memory[point - 1]
        break
  
      case '<-_':
        if (!memory[point]) memory[point] = 0
        memory[point] -= memory[point + 1]
        break

      case '<*^':
        if (!memory[point]) memory[point] = 0
        memory[point] *= memory[point - 1]
        break
  
      case '<*_':
        if (!memory[point]) memory[point] = 0
        memory[point] *= memory[point + 1]
        break

      case '</^':
        if (!memory[point]) memory[point] = 0
        memory[point] /= memory[point - 1]
        break
  
      case '</_':
        if (!memory[point]) memory[point] = 0
        memory[point] /= memory[point + 1]
        break

      case '->':
        if (!memory[point]) memory[point] = 0
        console.log(memory[point])
        break

      case '=>':
        if (!memory[point]) memory[point] = 0
        console.log(String.fromCharCode(memory[point]))
        break
      
      case ']':
        return 0

      default:
        break
    }
  })
}
