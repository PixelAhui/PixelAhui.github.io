const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');
const outputFile = path.join(__dirname, 'posts.json');

// Función auxiliar para obtener fecha
const getFileDate = (filePath) => {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
};

// Función recursiva para escanear carpetas (¡ESTA ES LA CLAVE!)
const getAllFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, arrayOfFiles); // Se mete en subcarpetas
        } else {
            if (file.endsWith('.md')) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
}

const generarIndice = () => {
    if (!fs.existsSync(contentDir)) {
        console.error("❌ No existe la carpeta content");
        process.exit(1);
    }

    let posts = [];
    const allFiles = getAllFiles(contentDir, []);

    allFiles.forEach(filePath => {
        // Normalizamos rutas para que funcionen en Linux/GitHub
        const relativePath = path.relative(contentDir, filePath).split(path.sep).join('/');
        const parts = relativePath.split('/');
        
        // Detección de Categoría y Subcategoría
        let category = 'general';
        let subcategory = 'general';

        if (parts.length >= 2) category = parts[0]; 
        if (parts.length >= 3) subcategory = parts[1].toLowerCase(); // Detecta 'writeups'

        const fileName = path.basename(filePath);
        const title = fileName.replace('.md', '').replace(/-/g, ' ');
        const id = relativePath.replace('.md', '');

        posts.push({
            id: id,
            title: title.charAt(0).toUpperCase() + title.slice(1),
            category: category,
            subcategory: subcategory, // ¡El dato que te falta!
            date: getFileDate(filePath),
            fileName: fileName
        });
    });

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
    console.log(`✅ Índice generado: ${posts.length} artículos.`);
};

generarIndice();