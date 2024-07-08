const fs = require('fs');
const path = require('path');

const ledgerDir = path.join(__dirname, '..', 'ledger');

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let fileList = [];

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fileList = fileList.concat(walkDir(filePath));
    } else if (file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function generateIndexContent(files) {
  const components = {};

  files.forEach(file => {
    const relativePath = path.relative(ledgerDir, file);
    const formattedPath = relativePath.replace(/\\/g, '/');
    const name = path.basename(file, path.extname(file));

    const importPath = `@/ledger/${formattedPath.replace('.tsx', '')}`;
    const componentEntry = {
      name,
      type: "components:example",
      registryDependencies: [name.split('-')[0]],  // Assuming first part of name is the dependency
      component: `React.lazy(() => import("${importPath}"))`,
      source: "",
      files: [`ledger/${formattedPath}`],
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    };

    components[name] = componentEntry;
  });

  let indexContent = '// @ts-nocheck\n\nimport * as React from "react"\n\nexport const Index: Record<string, any> = {\n';
  indexContent += '  default: {\n';

  Object.keys(components).forEach(key => {
    const component = components[key];
    indexContent += `    "${component.name}": {\n`;
    indexContent += `      name: "${component.name}",\n`;
    indexContent += `      type: "${component.type}",\n`;
    indexContent += `      registryDependencies: ${JSON.stringify(component.registryDependencies)},\n`;
    indexContent += `      component: ${component.component},\n`;
    indexContent += `      source: "${component.source}",\n`;
    indexContent += `      files: ${JSON.stringify(component.files)},\n`;
    indexContent += `      category: "${component.category}",\n`;
    indexContent += `      subcategory: "${component.subcategory}",\n`;
    indexContent += `      chunks: ${JSON.stringify(component.chunks)},\n`;
    indexContent += `    },\n`;
  });

  indexContent += '  },\n};\n';

  return indexContent;
}

function writeIndexFile(content) {
  const indexPath = path.join(ledgerDir, 'index.tsx');
  fs.writeFileSync(indexPath, content);
  console.log('index.ts file generated successfully!');
}

const tsxFiles = walkDir(ledgerDir);
const indexContent = generateIndexContent(tsxFiles);
writeIndexFile(indexContent);
