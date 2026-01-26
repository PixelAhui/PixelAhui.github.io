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