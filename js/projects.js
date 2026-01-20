document.addEventListener('DOMContentLoaded', () => {
    fetch('/posts.json')
        .then(response => response.json())
        .then(data => {
            // Filtrar SOLO cosas de ciberseguridad
            const ciberData = data.filter(p => p.category === 'projects');

            // Sub-filtrado por tipo (coincide con el nombre de tus carpetas)
            const progress = ciberData.filter(p => p.subcategory === 'progress');
            const prominent = ciberData.filter(p => p.subcategory === 'prominent');
            const finished = ciberData.filter(p => p.subcategory === 'finished');

            // Función reutilizable para renderizar tarjetas
            const renderCards = (items, containerId, emptyMsg) => {
                const container = document.getElementById(containerId);
                if (!container) return; // Seguridad por si falta el div

                if (items.length === 0) {
                    container.innerHTML = `<p style="color: #aaa; font-style: italic;">${emptyMsg}</p>`;
                    return;
                }

                container.innerHTML = items.map(post => {
                    const descripcion = `Descubre mas sobre este proyecto ${post.title}.`;
                    
                    return `
                    <article class="card">
                        <div class="card-content">
                            <span style="font-size:0.8rem; opacity:0.7; color: #00F0FF;">${post.date}</span>
                            <h3>${post.title}</h3>
                            <p>${descripcion}</p>
                            <a href="/article.html?id=${post.id}" class="btn-saber-mas">Saber Más</a>
                        </div>
                        <div class="card-icon">
                             <img src="../images/PixelAhui-EngineeringComputer" alt="icon">
                        </div>
                    </article>
                    `;
                }).join('');
            };

            // Inyectar en cada sección
            renderCards(proyectos, 'container-progress', 'Próximamente más proyectos...');
            renderCards(writeups, 'container-prominent', 'Proximamente mas proyectos...');
            renderCards(reflexiones, 'container-finished', 'Proximamente mas proyectos...');

        })
        .catch(err => console.error("Error cargando blog:", err));
});