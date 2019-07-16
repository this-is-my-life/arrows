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
    line = line.split('=>')[0]
    let arrowArray = line.split('<-')
    let cmd = arrowArray[0] ? arrowArray[0].trim().toLowerCase() : ''
    let arg0 = arrowArray[1] ? arrowArray[1].trim() : ''

    switch (cmd) {
      case 'con':
        converted += 'console.log(' + arg0 + ')'
        break;

      case 'con.err':
        converted += 'console.error(' + arg0 + ')'
        break;

      case 'con.dir':
        converted += 'console.dir(' + arg0 + ')'
        break;

      case 'exit':
        converted += 'return ' + arg0
        break;

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
  })

  if (!fs.existsSync('./tmp/')) {
    fs.mkdirSync('./tmp/')
  }

  fs.writeFileSync('./tmp/converted-' + Math.floor(Math.random() * 999999) + '.js', converted)

  converted = new Function(converted)
  return converted()
}