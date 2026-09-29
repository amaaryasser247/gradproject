import fs from 'fs';
import path from 'path';

const srcDir = './src';

function replaceColors(content) {
  let newContent = content;
  // Backgrounds
  newContent = newContent.replace(/bg-white/g, 'bg-card');
  newContent = newContent.replace(/bg-\[\#f5f1ec\]/g, 'bg-background');
  newContent = newContent.replace(/bg-\[\#F5F0EB\]/g, 'bg-background');
  newContent = newContent.replace(/bg-\[\#f3ede7\]/g, 'bg-card');
  newContent = newContent.replace(/bg-\[\#d97757\]/g, 'bg-accent');
  newContent = newContent.replace(/bg-\[\#C1714A\]/g, 'bg-accent');
  newContent = newContent.replace(/bg-\[\#e7cfc5\]/g, 'bg-accent/20');
  newContent = newContent.replace(/bg-\[\#eaded6\]/g, 'bg-muted');
  newContent = newContent.replace(/bg-\[\#f1ebe6\]/g, 'bg-muted');

  // Text
  newContent = newContent.replace(/text-gray-800/g, 'text-foreground');
  newContent = newContent.replace(/text-\[\#1C1410\]/g, 'text-foreground');
  newContent = newContent.replace(/text-gray-700/g, 'text-foreground');
  newContent = newContent.replace(/text-gray-600/g, 'text-muted-foreground');
  newContent = newContent.replace(/text-gray-500/g, 'text-muted-foreground');
  newContent = newContent.replace(/text-\[\#7A6A5F\]/g, 'text-muted-foreground');
  newContent = newContent.replace(/text-\[\#d97757\]/g, 'text-accent');
  newContent = newContent.replace(/text-\[\#c76f56\]/g, 'text-accent');
  newContent = newContent.replace(/text-\[\#C1714A\]/g, 'text-accent');

  // Borders
  newContent = newContent.replace(/border-gray-100/g, 'border-border');
  newContent = newContent.replace(/border-gray-200/g, 'border-border');

  return newContent;
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const updated = replaceColors(content);
      if (content !== updated) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log(`Updated colors in ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Color replacement complete.');
