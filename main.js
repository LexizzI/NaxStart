"use strict";

const defaultData = {
    work: { title: "Work", links: [{ name: "Mail", url: "https://mail.google.com", img: "img/mail.png" }, { name: "GitHub", url: "https://github.com", img: "img/github.png" }] },
    social: { title: "Social", links: [{ name: "Youtube", url: "https://youtube.com", img: "img/youtube.png" }] },
    streaming: { title: "Streaming", links: [{ name: "Netflix", url: "https://netflix.com", img: "img/netflix.png" }] }
};

const quotes = [
    "Believe in yourself!", "Stay focused, stay humble.", "Make it happen.", "Small steps every day.",
    "Your only limit is your mind.", "Keep pushing forward.", "Work hard in silence.", "Dream big, do bigger.",
    "Consistency is key.", "Focus on the goal.", "No one is illegal", "Be yourself; everyone else is already taken",
    "Per aspera ad astra", "Don't wish it were easier. Wish you were better.", "Never give up, trust your instincts.",
    "Level up!", "If you're encountering enemies, you're going the right way.", "Sometimes, you need to step back to move forward.",
    "Do not be sorry. Be better.", "It’s more important to master the cards you’re holding than to complain about the ones your opponent was dealt.",
    "Praise the Sun!", "The cake is a lie.", "Nothing is true, everything is permitted.", "War... war never changes.",
    "A man chooses, a slave obeys.", "Wake up, Samurai. We have a city to burn.", "Protocol 3: Protect the Pilot.",
    "Hesitation is defeat.", "Hræðsla kømr at óvær, en coratge støðr af várr", "No gods, no masters"
];

const themes = {
    default: { name: "NaxStart", background: "#282a36", text: "#f5e2f8", primary: "#ff79c6", contrast: "#282a36", contrast2: "#21222c" },
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
    bubblegum: { name: "Bubblegum Y2K", background: "#ffafcc", text: "#2b2d42", primary: "#ff006e", contrast: "#ffc8dd", contrast2: "#fb6f92" },
    synthwave: { name: "Synthwave Sunset", background: "#2b0b3d", text: "#e0def4", primary: "#f92aad", contrast: "#3d155f", contrast2: "#1a0628" },
    matrix: { name: "Matrix Code", background: "#000000", text: "#00ff41", primary: "#008f11", contrast: "#0d0d0d", contrast2: "#003b00" },
    coffee: { name: "Espresso Roast", background: "#1b1411", text: "#d7baad", primary: "#a67c52", contrast: "#2a1f1b", contrast2: "#120d0b" }
};

let userData = JSON.parse(localStorage.getItem("naxstart_data")) || defaultData;
let agendaData = JSON.parse(localStorage.getItem('nax-agenda-data')) || [];
let remindersVisible = true;

function apply_theme(theme) {
    const root = document.documentElement;
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--contrast", theme.contrast);
    root.style.setProperty("--contrast2", theme.contrast2);
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
    
    // Reset fields
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
        agendaData.forEach(task => {
            const item = document.createElement('div');
            item.className = 'task-item';
            item.innerHTML = `
                <div style="font-weight:bold; color:var(--primary);">${task.title}</div>
                <div style="font-size:0.75em; opacity:0.7;">${task.desc}</div>
                ${task.date ? `<div class="task-date">${task.date}</div>` : ''}
                <div style="margin-top:8px; display:flex; gap:5px;">
                    <button onclick="editTask(${task.id})" style="font-size:10px; color:var(--text); background:none; border:1px solid var(--contrast); cursor:pointer; padding:2px 5px;">EDIT</button>
                    <button onclick="removeTask(${task.id})" style="font-size:10px; color:var(--primary); background:none; border:1px solid var(--primary); cursor:pointer; padding:2px 5px;">DEL</button>
                </div>`;
            sidebarList.appendChild(item);
        });
    }

    if (mainArea) {
        mainArea.innerHTML = "";
        agendaData.forEach(task => {
            const reminder = document.createElement('div');
            reminder.className = 'reminder-card';
            reminder.innerHTML = `
                <span class="reminder-title">${task.title}</span>
                <span class="reminder-desc-text">${task.desc}</span>
            `;
            mainArea.appendChild(reminder);
        });
    }
}

// --- UI RENDERERS ---
function renderSettings() {
    const container = document.getElementById("settings-controls");
    if (!container) return;
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid var(--primary);">
            <button onclick="addSection()" style="grid-column: span 2; background: var(--primary); color: var(--background); padding: 10px; cursor: pointer; font-weight: bold; border-radius: 4px; letter-spacing: 1px;">+ CREATE NEW SECTION</button>
            <button onclick="exportConfig()" style="background: var(--contrast); color: var(--text); border: 1px solid var(--primary); padding: 8px; cursor: pointer; font-size: 0.8em; border-radius: 4px;">⬇ EXPORT JSON</button>
            <button onclick="document.getElementById('file-import').click()" style="background: var(--contrast); color: var(--text); border: 1px solid var(--primary); padding: 8px; cursor: pointer; font-size: 0.8em; border-radius: 4px;">⬆ IMPORT JSON</button>
            <input type="file" id="file-import" style="display:none" onchange="importConfig(event)">
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
                <input type="text" id="edit-section-title-${key}" value="${section.title}" oninput="updateSectionTitle('${key}')" style="flex-grow: 1; background: none; border: 1px solid var(--primary); color: var(--primary); font-weight: bold; padding: 4px; border-radius: 3px;">
                <button onclick="addLinkToSection('${key}')" style="background: var(--primary); color: var(--background); font-size: 0.7em; padding: 5px 8px; cursor: pointer; border-radius: 3px; font-weight: bold;">+ LINK</button>
                <button onclick="removeSection('${key}')" style="background: none; color: #ff5555; cursor: pointer; font-size: 0.7em; border: 1px solid #ff5555; padding: 4px; border-radius: 3px;">DEL SEC</button>
            </div>
        `;
        section.links.forEach((link, idx) => {
            const row = document.createElement("div");
            row.style.display = "flex";
            row.style.gap = "6px";
            row.style.marginBottom = "6px";
            row.innerHTML = `
                <input type="text" id="edit-name-${key}-${idx}" value="${link.name}" placeholder="Title" oninput="updateLink('${key}', ${idx})" style="width: 25%; background: var(--background); color: var(--text); border: 1px solid var(--contrast); padding: 6px; border-radius: 3px; font-size: 0.85em;">
                <input type="text" id="edit-url-${key}-${idx}" value="${link.url}" placeholder="URL" oninput="updateLink('${key}', ${idx})" style="width: 40%; background: var(--background); color: var(--text); border: 1px solid var(--contrast); padding: 6px; border-radius: 3px; font-size: 0.85em;">
                <input type="text" id="edit-img-${key}-${idx}" value="${link.img}" placeholder="Icon path" oninput="updateLink('${key}', ${idx})" style="width: 25%; background: var(--background); color: var(--text); border: 1px solid var(--contrast); padding: 6px; border-radius: 3px; font-size: 0.85em;">
                <button onclick="removeLinkFromSection('${key}', ${idx})" style="width: 10%; background: none; color: #ff5555; border: 1px solid #ff5555; cursor: pointer; border-radius: 3px; font-weight: bold;">×</button>
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
        sectionElement.innerHTML = `
            <p class="link-section-name">${section.title}</p>
            <div class="link-section__grid">
                ${section.links.map(link => link.url ? `
                    <a href="${link.url}" target="_blank" class="page-link" title="${link.name}">
                        <img src="${link.img}" alt="${link.name}" class="link-img">
                    </a>` : '').join('')}
            </div>
        `;
        mainContainer.appendChild(sectionElement);
    }
    setupHoverEffect();
}

// --- UTILS ---
window.toggleRemindersVisibility = () => {
    remindersVisible = !remindersVisible;
    const mainArea = document.getElementById('main-reminders-area');
    if (mainArea) mainArea.style.display = remindersVisible ? 'flex' : 'none';
};

window.toggleAgenda = () => document.getElementById('agenda-sidebar').classList.toggle('sidebar-hidden');
window.toggleSettings = () => document.getElementById("settings-panel").classList.toggle("active");

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
});

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key.toLowerCase() === 's') toggleSettings();
});