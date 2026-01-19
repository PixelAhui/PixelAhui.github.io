const fs = require('fs');
const path = require('path');

// Configuración
const contentDir = path.join(__dirname, 'content');
const outputFile = path.join(__dirname, 'posts.json');

// Función para obtener fecha de modificación
const getFileDate = (filePath) => {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
};

// Función principal
const generarIndice = () => {
    // 1. Verificar si existe la carpeta content
    if (!fs.existsSync(contentDir)) {
        console.error("❌ Error: No se encontró la carpeta 'content'.");
        process.exit(1);
    }

    let posts = [];
    
    // 2. Leer elementos dentro de /content
    const items = fs.readdirSync(contentDir, { withFileTypes: true });

    items.forEach(item => {
        // CASO A: Es una CARPETA (ej: /content/ciberseguridad)
        if (item.isDirectory()) {
            const category = item.name;
            const categoryPath = path.join(contentDir, category);
            
            // Leer archivos dentro de esa categoría
            const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'));

            files.forEach(file => {
                const title = file.replace('.md', '').replace(/-/g, ' ');
                // El ID ahora incluye la categoría: "ciberseguridad/mi-articulo"
                const id = `${category}/${file.replace('.md', '')}`;

                posts.push({
                    id: id,
                    title: title.charAt(0).toUpperCase() + title.slice(1),
                    category: category, // ¡Aquí está tu nueva propiedad!
                    date: getFileDate(path.join(categoryPath, file)),
                    fileName: file
                });
            });

        // CASO B: Es un ARCHIVO suelto en la raíz (ej: /content/hola.md)
        } else if (item.isFile() && item.name.endsWith('.md')) {
            const title = item.name.replace('.md', '').replace(/-/g, ' ');
            
            posts.push({
                id: item.name.replace('.md', ''),
                title: title.charAt(0).toUpperCase() + title.slice(1),
                category: 'general', // Categoría por defecto
                date: getFileDate(path.join(contentDir, item.name)),
                fileName: item.name
            });
        }
    });

    // 3. Ordenar por fecha (más reciente primero)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 4. Guardar
    fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
    console.log(`✅ Índice actualizado: ${posts.length} artículos detectados.`);
    console.log("📂 Categorías encontradas:", [...new Set(posts.map(p => p.category))].join(", "));
};

generarIndice();