const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');
const outputFile = path.join(__dirname, 'posts.json');

// --- 1. AQUÍ ESTÁ TU CATÁLOGO MAESTRO ---
// Aquí defines manualmente la imagen y descripción de tus archivos.
// La "clave" (key) debe ser el ID del archivo (la ruta sin .md)
const catalogo = {
    // EJEMPLO 1: Para el archivo en content/cibersecurity/writeups/installKali.md
    'projects/progress/terminado': {
        image: 'kali-logo.png',
        description: 'Aprende a instalar Kali Linux desde cero en una máquina virtual.'
    }
    // Agrega aquí tus otros artículos...
};


// --- Funciones del Sistema (No hace falta tocarlas mucho) ---

const getAllFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, arrayOfFiles);
        } else {
            if (file.endsWith('.md')) arrayOfFiles.push(fullPath);
        }
    });
    return arrayOfFiles;
}

const getFileDate = (filePath) => {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
};

const generarIndice = () => {
    console.log("🚀 Iniciando indexado por Catálogo Maestro...");
    
    if (!fs.existsSync(contentDir)) {
        console.error("❌ No existe content");
        process.exit(1);
    }

    let posts = [];
    const allFiles = getAllFiles(contentDir, []);

    allFiles.forEach(filePath => {
        // Normalizamos ruta para obtener el ID único
        const relativePath = path.relative(contentDir, filePath).split(path.sep).join('/');
        
        // ID: Es la ruta sin la extensión (ej: cibersecurity/writeups/installKali)
        const id = relativePath.replace('.md', '');
        
        const parts = relativePath.split('/');
        let category = parts.length >= 2 ? parts[0] : 'general';
        let subcategory = parts.length >= 3 ? parts[1].toLowerCase() : 'general';

        const fileName = path.basename(filePath);
        const title = fileName.replace('.md', '').replace(/-/g, ' ');

        // --- MAGIA AQUÍ: Buscamos en tu catálogo ---
        // Si existe en el catálogo, usa esos datos. Si no, usa los "Default".
        const datosPersonalizados = catalogo[id] || {}; 

        const imagenFinal = datosPersonalizados.image || null; // El frontend pondrá la default si es null
        const descFinal = datosPersonalizados.description || `Lectura sobre ${title}`;

        posts.push({
            id: id,
            title: title.charAt(0).toUpperCase() + title.slice(1),
            category: category,
            subcategory: subcategory,
            date: getFileDate(filePath),
            fileName: fileName,
            description: descFinal,
            image: imagenFinal
        });
        
        // Feedback en consola para saber qué encontró
        if (catalogo[id]) {
            console.log(`✅ Configurada: ${id}`);
        } else {
            console.log(`⚠️ Sin config (usando default): ${id}`);
        }
    });

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
    console.log(`✅ Índice generado con ${posts.length} artículos.`);
};

generarIndice();