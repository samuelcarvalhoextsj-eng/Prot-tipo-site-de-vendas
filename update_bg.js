const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let count = 0;
walkDir('src/app', function(filePath) {
  if (filePath.endsWith('.tsx') && !filePath.includes('layout.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('bg-background')) {
      // Replace bg-background with relative z-10 inside className strings
      let newContent = content.replace(/className="([^"]*)bg-background([^"]*)"/g, 'className="$1relative z-10$2"');
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent);
        count++;
        console.log('Updated', filePath);
      }
    }
  }
});
console.log('Updated ' + count + ' files.');
