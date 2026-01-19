const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');
const outputFile = path.join(__dirname, 'posts.json');

// Función auxiliar para obtener fecha
const getFileDate = (filePath) => {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
};

// Función recursiva para escanear carpetas
const getAllFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, arrayOfFiles);
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
        return;
    }

    let posts = [];
    const allFiles = getAllFiles(contentDir, []);

    allFiles.forEach(filePath => {
        // Obtenemos la ruta relativa para analizar las carpetas
        // Ejemplo: content/cibersecurity/proyectos/mi-nota.md
        const relativePath = path.relative(contentDir, filePath);
        const parts = relativePath.split(path.sep);

        // Lógica de clasificación
        let category = 'general';
        let subcategory = 'general';

        if (parts.length >= 2) {
            category = parts[0]; // "cibersecurity"
            
            // Si hay subcarpeta, la usamos como subcategoría
            if (parts.length >= 3) {
                subcategory = parts[1]; // "proyectos", "writeups", etc.
            }
        }

        const fileName = path.basename(filePath);
        const title = fileName.replace('.md', '').replace(/-/g, ' ');
        
        // Creamos el ID usando la ruta relativa pero con slashes web (/)
        // Esto es vital para que funcione en Windows y Linux igual
        const id = relativePath.replace('.md', '').replace(/\\/g, '/');

        posts.push({
            id: id,
            title: title.charAt(0).toUpperCase() + title.slice(1),
            category: category,      // Categoría Principal
            subcategory: subcategory, // Nueva propiedad: Tipo de contenido
            date: getFileDate(filePath),
            fileName: fileName
        });
    });

    // Ordenar por fecha
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
    console.log(`✅ Índice generado con ${posts.length} artículos.`);
    console.log(`📂 Subcategorías detectadas: ${[...new Set(posts.map(p => p.subcategory))].join(', ')}`);
};

generarIndice();