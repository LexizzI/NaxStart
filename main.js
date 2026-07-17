"use strict";

const defaultData = {
    work: { title: "Work", links: [{ name: "Mail", url: "https://mail.google.com", img: "img/mail.png" }, { name: "GitHub", url: "https://github.com", img: "img/github.png" }] },
    social: { title: "Social", links: [{ name: "Youtube", url: "https://youtube.com", img: "img/youtube.png" }] },
    streaming: { title: "Streaming", links: [{ name: "Netflix", url: "https://netflix.com", img: "img/netflix.png" }] }
};

const quotes = [
    "Believe in yourself!", "Stay focused, stay humble.", "Make it happen.", "Small steps every day.",
    "Your only limit is your mind.", "Keep pushing forward.", "Work hard in silence.", "Dream big, do bigger.",
    "Consistency is key.", "Focus on the goal.", "No one is illegal", "Be yourself everyone else is already taken",
    "Per aspera ad astra", "Don't wish it were easier. Wish you were better.", "Never give up, trust your instincts.",
    "Level up!", "If you're encountering enemies, you're going the right way.", "Sometimes, you need to step back to move forward.",
    "Do not be sorry. Be better.", "It’s more important to master the cards you’re holding than to complain about the ones your opponent was dealt.",
    "Praise the Sun!", "The cake is a lie.", "Nothing is true, everything is permitted.", "War... war never changes.",
    "A man chooses, a slave obeys.", "Wake up, Samurai. We have a city to burn.", "Protocol 3: Protect the Pilot.",
    "Hesitation is defeat.", "Hræðsla kømr at óvær, en coratge støðr af várr", "No gods, no masters",
    "Your focus determines your reality.","It is not the destination that matters. It is the journey.",
];

const themes = {
    default: { name: "NaxStart", background: "#282a36", text: "#f5e2f8", primary: "#ff79c6", contrast: "#282a36", contrast2: "#21222c" },
    kerubi: { name: "Kerubi", background: "#0a0412", text: "#e6dcff", primary: "#9d4edd", contrast: "#1f1035", contrast2: "#140824" },
    macos: { name: "macOS Dark", background: "#1e1e1e", text: "#f5f5f7", primary: "#007aff", contrast: "#2d2d2d", contrast2: "#161616" },
    macStudio: { name: "Mac Studio", background: "#1c1c1e", text: "#e3e3e6", primary: "#a3a3a8", contrast: "#2c2c2e", contrast2: "#111112" },
    ubuntu: { name: "Ubuntu", background: "#300a24", text: "#ffffff", primary: "#e95420", contrast: "#5e2750", contrast2: "#2c0720" },
    gruvbox: { name: "Gruvbox", background: "#282828", text: "#ebdbb2", primary: "#fabd2f", contrast: "#3c3836", contrast2: "#1d2021" },
    arch: { name: "Arch Linux", background: "#1793d1", text: "#ffffff", primary: "#333333", contrast: "#0f5f88", contrast2: "#0c4b6c" },
    kali: { name: "Kali Linux", background: "#000000", text: "#ffffff", primary: "#2f8dff", contrast: "#1a1a1a", contrast2: "#0d0d0d" },
    manjaro: { name: "Manjaro", background: "#2d3133", text: "#eeeeee", primary: "#35bf5c", contrast: "#3b444b", contrast2: "#1f2324" },
    dracula: { name: "Dracula", background: "#282a36", text: "#f8f8f2", primary: "#bd93f9", contrast: "#44475a", contrast2: "#191a21" },
    solarized: { name: "Solarized Dark", background: "#002b36", text: "#839496", primary: "#268bd2", contrast: "#073642", contrast2: "#001e26" },
    fedora: { name: "Fedora", background: "#294172", text: "#ffffff", primary: "#ffffff", contrast: "#3c6eb4", contrast2: "#1e2f53" },
    rosepine: { name: "Rosé Pine", background: "#191724", text: "#e0def4", primary: "#eb6f92", contrast: "#1f1d2e", contrast2: "#26233a" },
    tokyoNight: { name: "Tokyo Night", background: "#1a1b26", text: "#a9b1d6", primary: "#7aa2f7", contrast: "#24283b", contrast2: "#414868" },
    nord: { name: "Nord", background: "#2e3440", text: "#eceff4", primary: "#88c0d0", contrast: "#3b4252", contrast2: "#434c5e" },
    catppuccin: { name: "Catppuccin Mocha", background: "#1e1e2e", text: "#cdd6f4", primary: "#cba6f7", contrast: "#181825", contrast2: "#313244" },
    everforest: { name: "Everforest", background: "#2d353b", text: "#d3c6aa", primary: "#a7c080", contrast: "#343f44", contrast2: "#3d484d" },
    cyberpunk: { name: "Cyberpunk 2077", background: "#fdee00", text: "#000000", primary: "#00f0ff", contrast: "#fdee00", contrast2: "#e5d500" },
    fallout: { name: "Vault-Tec", background: "#00204a", text: "#ffcb05", primary: "#ffcb05", contrast: "#00306b", contrast2: "#001a3d" },
    doom: { name: "DOOM Eternal", background: "#0a0a0a", text: "#ff0000", primary: "#ff4500", contrast: "#1a1a1a", contrast2: "#330000" },
    minecraft: { name: "Minecraft Grass", background: "#4d9043", text: "#ffffff", primary: "#795548", contrast: "#3d7335", contrast2: "#2e5728" },
    portal: { name: "Aperture Science", background: "#ffffff", text: "#444444", primary: "#00a4ff", contrast: "#e5e5e5", contrast2: "#cccccc" },
    halo: { name: "Master Chief", background: "#343d28", text: "#d4af37", primary: "#515e41", contrast: "#2a3120", contrast2: "#1e2317" },
    matrix: { name: "Matrix Code", background: "#000000", text: "#00ff41", primary: "#008f11", contrast: "#0d0d0d", contrast2: "#003b00" },
    coffee: { name: "Espresso Roast", background: "#1b1411", text: "#d7baad", primary: "#a67c52", contrast: "#2a1f1b", contrast2: "#120d0b" },
    bubblegum: { name: "Bubblegum Y2K", background: "#ffafcc", text: "#2b2d42", primary: "#ff006e", contrast: "#ffc8dd", contrast2: "#fb6f92" },
    synthwave: { name: "Synthwave Sunset", background: "#2b0b3d", text: "#e0def4", primary: "#f92aad", contrast: "#3d155f", contrast2: "#1a0628" },
    blackPink: { name: "BlackPink", background: "#000000", text: "#ffffff", primary: "#ff5da2", contrast: "#1a1a1a", contrast2: "#111111" },
    neonRose: { name: "Neon Rose", background: "#0a090c", text: "#fde2e4", primary: "#ff007f", contrast: "#1b191d", contrast2: "#141216" },
    sakuraDark: { name: "Sakura Night", background: "#1d1a21", text: "#ffd6e0", primary: "#ff99c8", contrast: "#2a2431", contrast2: "#16131a" },
    cyberDoll: { name: "Cyber Doll", background: "#23001e", text: "#ff00d4", primary: "#ff00d4", contrast: "#380030", contrast2: "#1a0016" }
};
let userData = JSON.parse(localStorage.getItem("naxstart_data")) || defaultData;
let agendaData = JSON.parse(localStorage.getItem('nax-agenda-data')) || [];
let remindersVisible = true;

// Calcula si un color de fondo es claro u oscuro para decidir qué color de
// texto usar encima (accesibilidad: evita texto blanco sobre fondos claros).
function getReadableTextColor(hexColor) {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? "#111111" : "#ffffff";
}

function apply_theme(theme) {
    const root = document.documentElement;
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--contrast", theme.contrast);
    root.style.setProperty("--contrast2", theme.contrast2);
    root.style.setProperty("--card-text", getReadableTextColor(theme.contrast));
}

// --- LINKS LOGIC ---
window.updateLink = function(sectionKey, index) {
    const nameVal = document.getElementById(`edit-name-${sectionKey}-${index}`).value;
    const urlVal = document.getElementById(`edit-url-${sectionKey}-${index}`).value;
    const imgVal = document.getElementById(`edit-img-${sectionKey}-${index}`).value;
    userData[sectionKey].links[index] = { name: nameVal, url: urlVal, img: imgVal };
    localStorage.setItem("naxstart_data", JSON.stringify(userData));
    renderLinks();
};

window.addLinkToSection = function(sectionKey) {
    if (userData[sectionKey].links.length >= 8) {
        alert("Limit of 8 links reached for this section.");
        return;
    }
    userData[sectionKey].links.push({ name: "", url: "", img: "" });
    localStorage.setItem("naxstart_data", JSON.stringify(userData));
    renderSettings();
    renderLinks();
};

window.removeLinkFromSection = function(sectionKey, index) {
    userData[sectionKey].links.splice(index, 1);
    localStorage.setItem("naxstart_data", JSON.stringify(userData));
    renderSettings();
    renderLinks();
};

// Permite usar una imagen del propio ordenador como icono de un enlace.
// Se lee el archivo local y se guarda como Data URL en localStorage, sin
// necesidad de subirla a ningún servidor.
window.updateLinkImageFromFile = function(sectionKey, index, event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        announceToScreenReader("El archivo elegido no es una imagen.");
        alert("Por favor selecciona un archivo de imagen (PNG, JPG, SVG, etc.).");
        return;
    }

    const MAX_SIZE_BYTES = 1024 * 1024; // 1MB, para no saturar localStorage
    if (file.size > MAX_SIZE_BYTES) {
        alert("La imagen es demasiado grande. Usa una menor de 1MB.");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        userData[sectionKey].links[index].img = e.target.result;
        localStorage.setItem("naxstart_data", JSON.stringify(userData));
        renderSettings();
        renderLinks();
        announceToScreenReader(`Icono personalizado cargado para ${userData[sectionKey].links[index].name || "el enlace"}.`);
    };
    reader.onerror = () => {
        alert("No se pudo leer la imagen. Inténtalo de nuevo.");
    };
    reader.readAsDataURL(file);
};

// Región viva discreta para avisos a lectores de pantalla que no encajan
// en ningún otro contenedor con aria-live.
function announceToScreenReader(message) {
    let liveRegion = document.getElementById("sr-announcer");
    if (!liveRegion) {
        liveRegion = document.createElement("div");
        liveRegion.id = "sr-announcer";
        liveRegion.setAttribute("role", "status");
        liveRegion.setAttribute("aria-live", "polite");
        liveRegion.className = "visually-hidden";
        document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = message;
}

window.updateSectionTitle = function(key) {
    const newTitle = document.getElementById(`edit-section-title-${key}`).value;
    if (!newTitle) return;
    userData[key].title = newTitle;
    localStorage.setItem("naxstart_data", JSON.stringify(userData));
    renderLinks();
};

window.addSection = function() {
    const sectionName = prompt("New Section Title:");
    if (!sectionName) return;
    const key = sectionName.toLowerCase().replace(/\s+/g, '_') + Date.now();
    userData[key] = { title: sectionName, links: [{ name: "", url: "", img: "" }] };
    localStorage.setItem("naxstart_data", JSON.stringify(userData));
    renderLinks();
    renderSettings();
};

window.removeSection = function(key) {
    if (confirm(`Delete entire section "${userData[key].title}"?`)) {
        delete userData[key];
        localStorage.setItem("naxstart_data", JSON.stringify(userData));
        renderLinks();
        renderSettings();
    }
};

window.exportConfig = function() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userData));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", "naxstart_backup.json");
    dl.click();
};

window.importConfig = function(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
        userData = JSON.parse(e.target.result);
        localStorage.setItem("naxstart_data", JSON.stringify(userData));
        location.reload(); 
    };
    reader.readAsText(event.target.files[0]);
};

// --- AGENDA LOGIC (CORRECTED TO MATCH YOUR HTML) ---
window.saveTask = function() {
    const idField = document.getElementById('task-edit-id');
    const titleField = document.getElementById('task-input-field');
    const descField = document.getElementById('task-desc');
    const dateField = document.getElementById('date-input-field');

    if (!titleField.value) return;

    if (idField.value) {
        // Edit existing
        const task = agendaData.find(t => t.id == idField.value);
        if (task) {
            task.title = titleField.value;
            task.desc = descField.value;
            task.date = dateField.value;
        }
    } else {
        // Add new
        const newTask = {
            id: Date.now(),
            title: titleField.value,
            desc: descField.value,
            date: dateField.value
        };
        agendaData.push(newTask);
    }

    localStorage.setItem('nax-agenda-data', JSON.stringify(agendaData));
    
    idField.value = "";
    titleField.value = "";
    descField.value = "";
    dateField.value = "";
    document.getElementById('task-save-btn').textContent = "Add Entry";

    renderAgenda();
};

window.removeTask = function(id) {
    agendaData = agendaData.filter(t => t.id !== id);
    localStorage.setItem('nax-agenda-data', JSON.stringify(agendaData));
    renderAgenda();
};

window.editTask = function(id) {
    const task = agendaData.find(t => t.id === id);
    if (!task) return;
    
    document.getElementById('task-edit-id').value = task.id;
    document.getElementById('task-input-field').value = task.title;
    document.getElementById('task-desc').value = task.desc;
    document.getElementById('date-input-field').value = task.date || "";
    document.getElementById('task-save-btn').textContent = "Update Entry";
};

function renderAgenda() {
    const sidebarList = document.getElementById('tasks-list');
    const mainArea = document.getElementById('main-reminders-area');
    
    if (sidebarList) {
        sidebarList.innerHTML = "";
        if (agendaData.length === 0) {
            sidebarList.innerHTML = `<p style="opacity:0.6; font-size:0.85em;">No hay tareas todavía.</p>`;
        }
        agendaData.forEach(task => {
            const item = document.createElement('div');
            item.className = 'task-item';
            item.setAttribute('role', 'listitem');
            item.innerHTML = `
                <div style="font-weight:bold; color:var(--primary);">${task.title}</div>
                <div style="font-size:0.75em; opacity:0.7;">${task.desc}</div>
                ${task.date ? `<div class="task-date">${task.date}</div>` : ''}
                <div style="margin-top:8px; display:flex; gap:5px;">
                    <button onclick="editTask(${task.id})" aria-label="Editar tarea: ${task.title}" style="font-size:10px; color:var(--text); background:none; border:1px solid var(--contrast); cursor:pointer; padding:2px 5px;">EDITAR</button>
                    <button onclick="removeTask(${task.id})" aria-label="Eliminar tarea: ${task.title}" style="font-size:10px; color:var(--primary); background:none; border:1px solid var(--primary); cursor:pointer; padding:2px 5px;">BORRAR</button>
                </div>`;
            sidebarList.appendChild(item);
        });
    }

    if (mainArea) {
        mainArea.innerHTML = "";
        agendaData.forEach(task => {
            const reminder = document.createElement('div');
            reminder.className = 'reminder-card';
            reminder.setAttribute('role', 'listitem');
            reminder.innerHTML = `
                <span class="reminder-title">${task.title}</span>
                <span class="reminder-desc-text">${task.desc}</span>
            `;
            mainArea.appendChild(reminder);
        });
    }
}

function renderSettings() {
    const container = document.getElementById("settings-controls");
    if (!container) return;
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid var(--primary);">
            <button onclick="addSection()" style="grid-column: span 2; background: var(--primary); color: var(--background); padding: 10px; cursor: pointer; font-weight: bold; border-radius: 4px; letter-spacing: 1px;">+ CREATE NEW SECTION</button>
            <button onclick="exportConfig()" aria-label="Exportar configuración a JSON" style="background: var(--contrast); color: var(--text); border: 1px solid var(--primary); padding: 8px; cursor: pointer; font-size: 0.8em; border-radius: 4px;">⬇ EXPORTAR JSON</button>
            <button onclick="document.getElementById('file-import').click()" aria-label="Importar configuración desde JSON" style="background: var(--contrast); color: var(--text); border: 1px solid var(--primary); padding: 8px; cursor: pointer; font-size: 0.8em; border-radius: 4px;">⬆ IMPORTAR JSON</button>
            <input type="file" id="file-import" accept="application/json" class="visually-hidden" tabindex="-1" aria-hidden="true" onchange="importConfig(event)">
        </div>
    `;
    for (const key in userData) {
        const section = userData[key];
        const div = document.createElement("div");
        div.style.marginBottom = "30px";
        div.style.padding = "10px";
        div.style.background = "rgba(0,0,0,0.1)";
        div.style.borderRadius = "8px";
        div.innerHTML = `
            <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 12px;">
                <label for="edit-section-title-${key}" class="visually-hidden">Título de la sección ${section.title}</label>
                <input type="text" id="edit-section-title-${key}" value="${section.title}" oninput="updateSectionTitle('${key}')" style="flex-grow: 1; background: none; border: 1px solid var(--primary); color: var(--primary); font-weight: bold; padding: 4px; border-radius: 3px;">
                <button onclick="addLinkToSection('${key}')" aria-label="Añadir enlace a ${section.title}" style="background: var(--primary); color: var(--background); font-size: 0.7em; padding: 5px 8px; cursor: pointer; border-radius: 3px; font-weight: bold;">+ LINK</button>
                <button onclick="removeSection('${key}')" aria-label="Eliminar sección ${section.title}" style="background: none; color: #ff5555; cursor: pointer; font-size: 0.7em; border: 1px solid #ff5555; padding: 4px; border-radius: 3px;">DEL SEC</button>
            </div>
        `;
        section.links.forEach((link, idx) => {
            const row = document.createElement("div");
            row.style.display = "flex";
            row.style.gap = "6px";
            row.style.marginBottom = "6px";
            const rowId = `${key}-${idx}`;
            row.innerHTML = `
                <label for="edit-name-${rowId}" class="visually-hidden">Título del enlace</label>
                <input type="text" id="edit-name-${rowId}" value="${link.name}" placeholder="Título" oninput="updateLink('${key}', ${idx})" style="width: 22%; background: var(--background); color: var(--text); border: 1px solid var(--contrast); padding: 6px; border-radius: 3px; font-size: 0.85em;">

                <label for="edit-url-${rowId}" class="visually-hidden">URL del enlace</label>
                <input type="text" id="edit-url-${rowId}" value="${link.url}" placeholder="URL" oninput="updateLink('${key}', ${idx})" style="width: 33%; background: var(--background); color: var(--text); border: 1px solid var(--contrast); padding: 6px; border-radius: 3px; font-size: 0.85em;">

                <label for="edit-img-${rowId}" class="visually-hidden">Ruta o URL del icono</label>
                <input type="text" id="edit-img-${rowId}" value="${link.img}" placeholder="Ruta/URL del icono" oninput="updateLink('${key}', ${idx})" style="width: 20%; background: var(--background); color: var(--text); border: 1px solid var(--contrast); padding: 6px; border-radius: 3px; font-size: 0.85em;">

                <label for="upload-img-${rowId}" title="Subir imagen desde el PC" style="width: 15%; display:flex; align-items:center; justify-content:center; background: var(--contrast); color: var(--text); border: 1px solid var(--primary); cursor: pointer; border-radius: 3px; font-size: 0.9em;" aria-label="Subir icono desde el ordenador para ${link.name || 'este enlace'}">
                    📁
                    <input type="file" id="upload-img-${rowId}" accept="image/*" class="visually-hidden" onchange="updateLinkImageFromFile('${key}', ${idx}, event)">
                </label>

                <button onclick="removeLinkFromSection('${key}', ${idx})" aria-label="Eliminar enlace ${link.name || ''}" style="width: 10%; background: none; color: #ff5555; border: 1px solid #ff5555; cursor: pointer; border-radius: 3px; font-weight: bold;">×</button>
            `;
            div.appendChild(row);
        });
        container.appendChild(div);
    }
}

function renderLinks() {
    const mainContainer = document.querySelector(".links-block");
    if (!mainContainer) return;
    mainContainer.innerHTML = "";
    for (const key in userData) {
        const section = userData[key];
        const sectionElement = document.createElement("section");
        sectionElement.className = "link-section";
        sectionElement.setAttribute("aria-labelledby", `section-title-${key}`);
        sectionElement.innerHTML = `
            <p class="link-section-name" id="section-title-${key}" tabindex="0">${section.title}</p>
            <div class="link-section__grid" role="list">
                ${section.links.map(link => {
                    if (!link.url) return '';
                    const safeName = link.name || "Enlace sin título";
                    const initials = safeName.trim().slice(0, 2).toUpperCase();
                    const iconMarkup = link.img
                        ? `<img src="${link.img}" alt="" class="link-img">`
                        : `<div class="link-icon-placeholder" aria-hidden="true">${initials}</div>`;
                    return `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="page-link" title="${safeName}" aria-label="${safeName} (se abre en una pestaña nueva)" role="listitem">
                        ${iconMarkup}
                        <span class="link-card-name">${safeName}</span>
                    </a>`;
                }).join('')}
            </div>
        `;
        mainContainer.appendChild(sectionElement);
    }
    setupHoverEffect();
}

window.toggleRemindersVisibility = () => {
    remindersVisible = !remindersVisible;
    document.body.classList.toggle('hide-reminders-active', !remindersVisible);

    const btn = document.getElementById('hide-reminders-btn');
    const label = document.getElementById('hide-reminders-btn-label');
    if (btn) btn.setAttribute('aria-pressed', String(remindersVisible));
    if (label) label.textContent = remindersVisible ? 'Ocultar recordatorios' : 'Mostrar recordatorios';
};

window.toggleAgenda = () => {
    const sidebar = document.getElementById('agenda-sidebar');
    const trigger = document.getElementById('agenda-trigger');
    const isHidden = sidebar.classList.toggle('sidebar-hidden');
    sidebar.setAttribute('aria-hidden', String(isHidden));
    if (trigger) trigger.setAttribute('aria-expanded', String(!isHidden));

    if (!isHidden) {
        // Al abrir, mover el foco dentro del panel (accesibilidad por teclado)
        const firstField = document.getElementById('task-input-field');
        if (firstField) firstField.focus();
    } else if (trigger) {
        trigger.focus();
    }
};

window.toggleSettings = () => {
    const panel = document.getElementById("settings-panel");
    const isActive = panel.classList.toggle("active");
    panel.setAttribute('aria-hidden', String(!isActive));
    if (isActive) {
        const closeBtn = panel.querySelector('.sidebar-close-btn');
        if (closeBtn) closeBtn.focus();
    }
};

function setupCarousel() {
    const track = document.querySelector(".links-block");
    if (!track) return;

    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function scrollByCard(direction) {
        const card = track.querySelector(".link-section");
        const amount = card ? card.getBoundingClientRect().width + 40 : 300;
        track.scrollBy({ left: amount * direction, behavior: reducedMotion ? "auto" : "smooth" });
    }

    if (prevBtn) prevBtn.onclick = () => scrollByCard(-1);
    if (nextBtn) nextBtn.onclick = () => scrollByCard(1);

    // Navegación con teclado cuando el carrusel tiene el foco
    track.onkeydown = (e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); scrollByCard(1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); scrollByCard(-1); }
    };

    // Arrastrar con el ratón para deslizar el carrusel (los táctiles y el
    // trackpad ya funcionan de forma nativa gracias a overflow-x + scroll-snap)
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let didDrag = false;

    track.addEventListener("pointerdown", (e) => {
        if (e.pointerType === "touch") return; // el táctil ya se gestiona nativamente
        isDown = true;
        didDrag = false;
        track.classList.add("is-dragging");
        startX = e.clientX;
        startScroll = track.scrollLeft;
        track.setPointerCapture(e.pointerId);
    });

    track.addEventListener("pointermove", (e) => {
        if (!isDown) return;
        const delta = e.clientX - startX;
        if (Math.abs(delta) > 5) didDrag = true;
        track.scrollLeft = startScroll - delta;
    });

    function endDrag(e) {
        if (!isDown) return;
        isDown = false;
        track.classList.remove("is-dragging");
    }
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointerleave", endDrag);
    track.addEventListener("pointercancel", endDrag);

    // Si hubo arrastre, evita que el click suelte accidentalmente un enlace
    track.addEventListener("click", (e) => {
        if (didDrag) {
            e.preventDefault();
            e.stopPropagation();
            didDrag = false;
        }
    }, true);
}

function setupHoverEffect() {
    const links = document.querySelectorAll(".page-link");
    const welcome = document.getElementById("welcomeMessageText");
    links.forEach(l => {
        l.onmouseover = () => { if(welcome) welcome.textContent = l.title || "Link"; };
        l.onmouseout = () => { if(welcome) welcome.textContent = "Welcome to NaxStart"; };
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const themeSelector = document.getElementById("themeSelector");
    if (themeSelector) {
        for (const key in themes) {
            const opt = document.createElement("option");
            opt.value = key; opt.textContent = themes[key].name;
            themeSelector.appendChild(opt);
        }
        themeSelector.onchange = (e) => {
            apply_theme(themes[e.target.value]);
            localStorage.setItem("theme", e.target.value);
        };
        const saved = localStorage.getItem("theme") || "default";
        themeSelector.value = saved;
        apply_theme(themes[saved]);
    }
    const qBox = document.getElementById("quote-box");
    if (qBox) qBox.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    renderLinks();
    renderAgenda();
    renderSettings();
    setupCarousel();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('agenda-sidebar');
        const settings = document.getElementById('settings-panel');
        if (sidebar && !sidebar.classList.contains('sidebar-hidden')) toggleAgenda();
        if (settings && settings.classList.contains('active')) toggleSettings();
        return;
    }
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key.toLowerCase() === 's') toggleSettings();
});