const fs = require('fs');

function checkFile(path) {
  console.log(`Checking file: ${path}`);
  try {
    const html = fs.readFileSync(path, 'utf8');
    const startTag = '<script type="text/javascript">';
    const endTag = '</script>';
    
    const startIndex = html.indexOf(startTag);
    if (startIndex === -1) {
      console.error('Error: text/javascript script tag not found.');
      return false;
    }
    
    const contentStart = startIndex + startTag.length;
    const endIndex = html.indexOf(endTag, contentStart);
    if (endIndex === -1) {
      console.error('Error: Closing script tag not found.');
      return false;
    }
    
    const jsCode = html.substring(contentStart, endIndex);
    console.log(`  Babel/JS script length: ${jsCode.length} characters.`);
    
    let braceCount = 0;
    let bracketCount = 0;
    let parenCount = 0;
    
    for (let i = 0; i < jsCode.length; i++) {
      const char = jsCode[i];
      if (char === '{') braceCount++;
      else if (char === '}') braceCount--;
      else if (char === '[') bracketCount++;
      else if (char === ']') bracketCount--;
      else if (char === '(') parenCount++;
      else if (char === ')') parenCount--;
    }
    
    console.log(`  Curly braces {} balance: ${braceCount}`);
    console.log(`  Square brackets [] balance: ${bracketCount}`);
    console.log(`  Parentheses () balance: ${parenCount}`);
    
    if (braceCount !== 0 || bracketCount !== 0 || parenCount !== 0) {
      console.error('  WARNING: Brackets are unbalanced!');
      return false;
    } else {
      console.log('  SUCCESS: Brackets are perfectly balanced!');
      return true;
    }
  } catch (e) {
    console.error(`  Error parsing file:`, e);
    return false;
  }
}

const file = '/Users/avra/gcc cgit x bose/Main.html';
const res = checkFile(file);
if (res) {
  console.log('\nAll syntax checks PASSED cleanly!');
  process.exit(0);
} else {
  console.error('\nSyntax checks FAILED!');
  process.exit(1);
}
