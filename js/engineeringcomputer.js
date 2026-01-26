document.addEventListener('DOMContentLoaded', () => {
    fetch('/posts.json?v=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            const ciberData = data.filter(p => p.category === 'engineeringcomputer');

            const progress = ciberData.filter(p => p.subcategory === 'projects');
            const prominent = ciberData.filter(p => p.subcategory === 'articles');
            const finished = ciberData.filter(p => p.subcategory === 'thoughts');

            const renderCards = (items, containerId, emptyMsg) => {
                const container = document.getElementById(containerId);
                if (!container) return;

                if (items.length === 0) {
                    container.innerHTML = `<p style="color: #aaa; font-style: italic;">${emptyMsg}</p>`;
                    return;
                }

                container.innerHTML = items.map(post => {
                    // 2. LÓGICA DINÁMICA DE DESCRIPCIÓN
                    // Si el JSON trae descripción, úsala. Si no, usa el texto genérico.
                    const descripcionFinal = post.description || `Descubre más sobre este proyecto ${post.title}.`;

                    // 3. LÓGICA DINÁMICA DE IMAGEN
                    // Si el JSON trae imagen, úsala. Si no, usa la default.
                    const imgName = post.image ? post.image : 'PixelAhui-EngineeringComputer.png';
                    
                    // Usamos ruta absoluta /images/ para evitar errores de carpetas
                    const imagePath = imgName.startsWith('http') ? imgName : `/images/${imgName}`;

                    return `
                    <article class="secciones">
                        <div>
                            <h3>${post.title}</h3>
                            
                            <p>${descripcionFinal}</p>
                            
                            <div class="card-icon">
                                <img src="${imagePath}" alt="${post.title}" onerror="this.src='/images/PixelAhui-EngineeringComputer.png'">
                            </div><br/>
                            <div class="seccion-footer">
                                <span>${post.date}</span>
                                <a href="/article.html?id=${post.id}" class="btn-saber-mas">Saber Más</a>
                            </div>
                        </div>
                    </article>
                    `;
                }).join('');
            };

            renderCards(progress, 'container-progress', 'Próximamente más proyectos...');
            renderCards(prominent, 'container-prominent', 'Proximamente mas proyectos...');
            renderCards(finished, 'container-finished', 'Proximamente mas proyectos...');

        })
        .catch(err => console.error("Error cargando blog:", err));
});