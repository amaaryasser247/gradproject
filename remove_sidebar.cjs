const fs = require('fs');
const path = require('path');

const files = [
  "Products.jsx",
  "ProductsPreview.jsx",
  "Inventory.jsx",
  "EditProduct.jsx",
  "Categories.jsx",
  "Analytics.jsx",
  "AddProduct.jsx",
  "VendorProfile.jsx"
];

const dir = "d:/projects/grad project/gradproject/src";

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Remove import
  content = content.replace(/import Sidebar from ["']\.\/Sidebar["'];?\r?\n?/g, '');
  
  // Remove Sidebar wrapper (various formats)
  content = content.replace(/<div className="w-64 fixed h-full[^>]*>\s*<Sidebar \/>\s*<\/div>/g, '');
  content = content.replace(/<div className="w-64 fixed h-full z-10 left-0">\s*<Sidebar \/>\s*<\/div>/g, '');
  content = content.replace(/<div className="w-64 fixed h-full">\s*<Sidebar \/>\s*<\/div>/g, '');
  content = content.replace(/<aside className="w-64 fixed h-full border-r bg-white">\s*<Sidebar \/>\s*<\/aside>/g, '');
  content = content.replace(/<Sidebar \/>/g, ''); // Fallback
  
  // Remove ml-64
  content = content.replace(/ml-64/g, '');
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
