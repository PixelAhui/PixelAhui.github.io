// Lógica del Visor
document.addEventListener('DOMContentLoaded', async () => {
// 1. Obtener el ID de la URL
const params = new URLSearchParams(window.location.search);
const articleId = params.get('id');
const container = document.getElementById('markdown-render');

if (!articleId) {
    container.innerHTML = "<h1>Error: No se especificó ningún artículo.</h1>";
    return;
}

try {
    // 2. Buscar el archivo Markdown original
    // Asumimos que están en la carpeta 'content'
    const response = await fetch(`./content/${articleId}.md`);

    if (!response.ok) {
        throw new Error("Artículo no encontrado (404)");
    }

    const markdownText = await response.text();

    // 3. Configurar Marked para seguridad y estilos
    marked.setOptions({
        breaks: true, // Enter en MD = Salto de línea en HTML
        gfm: true     // GitHub Flavored Markdown
    });

    // 4. Convertir e inyectar
    // Nota: Si usas Frontmatter (YAML) al inicio, deberías limpiarlo aquí.
    // Una forma simple de limpiar YAML básico es:
    const cleanMarkdown = markdownText.replace(/^---[\s\S]+?---/, '');
    
    // --- MAGIA NUEVA: Corrector de Rutas de Imágenes ---
    
    // 1. Calculamos dónde vive este artículo (ej: "content/cibersecurity/writeups")
    // Tomamos el ID y le quitamos el nombre del archivo final
    const articleFolder = articleId.substring(0, articleId.lastIndexOf('/'));
    const basePath = `content/${articleFolder}/`; 

    // 2. Corregimos los enlaces estándar de Markdown [text](../ruta)
    // Buscamos cualquier enlace que empiece con "../" y le pegamos la ruta completa antes
    let fixedMarkdown = cleanMarkdown.replace(/\]\(\.\.\//g, `](${basePath}../`);

    // 3. Corregimos los enlaces estilo Obsidian ![[imagen.png]] (Por si acaso)
    // Los convertimos a Markdown estándar apuntando a la carpeta de imágenes relativa
    fixedMarkdown = fixedMarkdown.replace(/!\[\[(.*?)\]\]/g, (match, fileName) => {
        return `![${fileName}](${basePath}../images/${fileName})`; 
    });

    // Renderizamos el markdown YA CORREGIDO
    container.innerHTML = marked.parse(fixedMarkdown);

    container.innerHTML = marked.parse(cleanMarkdown);
    
    // Actualizar título de la pestaña
    // Usamos el primer H1 que encontremos o el ID
    const titleMatch = cleanMarkdown.match(/^# (.+)$/m);
    document.title = (titleMatch ? titleMatch[1] : articleId) + " | PixelAhui";

    // 5. Activar el resaltado de sintaxis de Prism
    Prism.highlightAll();

} catch (error) {
    console.error(error);
    container.innerHTML = `
        <h1>Error 404</h1>
        <p>Lo sentimos, no pudimos cargar el artículo "<em>${articleId}</em>".</p>
        <p>Verifica que el archivo exista en la carpeta /content.</p>
    `;
}
});