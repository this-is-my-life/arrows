const fs = require('fs')

module.exports.interpret = (target) => {
  if (!target) {
    console.error('Err: Wrong execute!')
    return 1
  }

  if (!fs.existsSync(target)) {
    console.error('Err: File NOT exist')
    return 1
  }
  
  let data = fs.readFileSync(target).toString('utf8')
  let converted = ''
  
  data.split('\n').forEach((line) => {
    converted += '\n'
    let arrowArray = line.split('<')
    let cmd = arrowArray[0].trim().toLowerCase()
    let arg = arrowArray[1] ? arrowArray[1].trim() : null

    switch (cmd) {
      case 'con':
        converted += 'console.log(' + arg + ')'
        break;

      case 'con.err':
        converted += 'console.error(' + arg + ')'
        break;

      case 'con.dir':
        converted += 'console.dir(' + arg + ')'
        break;

      case 'exit':
        converted += 'return ' + arg
        break;

      default:
        break;
    }
  })
  
  converted = new Function(converted)
  return converted()
}