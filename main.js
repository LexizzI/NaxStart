"use strict";

const defaultData = {
    work: {
        title: "Work",
        icon: "icons/work.svg",
        links: [
            { name: "Mail", url: "https://mail.google.com", img: "img/mail.png" },
            { name: "GitHub", url: "https://github.com", img: "img/github.png" },
            { name: "", url: "", img: "" },
            { name: "", url: "" , img: "" }
        ]
    },
    social: {
        title: "Social",
        icon: "icons/social.svg",
        links: [
            { name: "Youtube", url: "https://youtube.com", img: "img/youtube.png" },
            { name: "", url: "", img: "" },
            { name: "", url: "", img: "" },
            { name: "", url: "", img: "" }
        ]
    },
    streaming: {
        title: "Streaming",
        icon: "icons/tvshow.svg",
        links: [
            { name: "Netflix", url: "https://netflix.com", img: "img/netflix.png" },
            { name: "", url: "", img: "" },
            { name: "", url: "", img: "" },
            { name: "", url: "", img: "" }
        ]
    }
};

let userData = JSON.parse(localStorage.getItem("naxstart_data")) || defaultData;

function renderLinks() {
    const container = document.querySelector(".links-block");
    if (!container) return;

    container.innerHTML = ""; 

    for (const key in userData) {
        const section = userData[key];
        const sectionHTML = `
            <section class="link-section">
                <p class="link-section-name"><img src="${section.icon}">${section.title}</p>
                <div class="link-section__grid">
                    ${section.links.map(link => link.url ? `
                        <a href="${link.url}" target="_blank" class="page-link" title="${link.name}">
                            <img src="${link.img}" alt="${link.name}" class="link-img">
                        </a>` : '').join('')}
                </div>
            </section>`;
        container.innerHTML += sectionHTML;
    }
    setupHoverEffect();
}

function setupHoverEffect() {
    const links = document.getElementsByClassName("page-link");
    const welcomeMessageText = document.getElementById("welcomeMessageText");

    for (const link of links) {
        link.addEventListener("mouseover", event => {
            const imgAlt = event.currentTarget.querySelector('img').alt;
            if(welcomeMessageText) welcomeMessageText.textContent = imgAlt;
        });
        link.addEventListener("mouseout", () => {
            if(welcomeMessageText) welcomeMessageText.textContent = "Welcome to NaxStart";
        });
    }
}

function generateSettingsUI() {
    const container = document.getElementById("settings-controls");
    if (!container) return;

    container.innerHTML = "";

    for (const key in userData) {
        const group = document.createElement("div");
        group.style.marginBottom = "20px";
        group.style.borderBottom = "1px solid var(--primary)";
        group.style.paddingBottom = "10px";

        group.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <input type="text" value="${userData[key].title}" 
                    oninput="updateSectionTitle('${key}', this.value)" 
                    style="background:transparent; color:var(--primary); border:none; border-bottom:1px dashed var(--primary); font-size:1.2em; width:70%; margin-bottom:10px; font-family:'Ubuntu', sans-serif;">
                <button onclick="deleteSection('${key}')" style="background:#ff5555; color:white; border-radius:4px; padding:2px 5px; cursor:pointer; font-size:10px;">X</button>
            </div>
        `;

        userData[key].links.forEach((link, i) => {
            const row = document.createElement("div");
            row.style.cssText = "background:var(--contrast); padding:8px; border-radius:6px; margin-bottom:10px;";
            
            row.innerHTML = `
                <input type="text" placeholder="Nombre" value="${link.name}" oninput="updateData('${key}', ${i}, 'name', this.value)" style="width:100%; background:var(--background); color:var(--text); border:1px solid var(--primary); font-size:11px; padding:2px; margin-bottom:2px;">
                <input type="text" placeholder="URL" value="${link.url}" oninput="updateData('${key}', ${i}, 'url', this.value)" style="width:100%; background:var(--background); color:var(--text); border:1px solid var(--primary); font-size:11px; padding:2px; margin-bottom:2px;">
                <input type="text" placeholder="Icono" value="${link.img}" oninput="updateData('${key}', ${i}, 'img', this.value)" style="width:100%; background:var(--background); color:var(--text); border:1px solid var(--primary); font-size:11px; padding:2px;">
            `;
            group.appendChild(row);
        });
        container.appendChild(group);
    }

    const addBtn = document.createElement("button");
    addBtn.textContent = "+ Añadir Sección";
    addBtn.style.cssText = "width:100%; background:var(--primary); color:var(--background); border:none; padding:10px; border-radius:8px; cursor:pointer; font-weight:bold; margin-top:10px;";
    addBtn.onclick = addNewSection;
    container.appendChild(addBtn);
}

function updateData(sectionKey, index, field, value) {
    userData[sectionKey].links[index][field] = value;
    saveAndRefresh();
}

function updateSectionTitle(key, value) {
    userData[key].title = value;
    saveAndRefresh();
}

function addNewSection() {
    const id = "custom_" + Date.now();
    userData[id] = {
        title: "New Section",
        icon: "icons/work.svg",
        links: [
            { name: "", url: "", img: "" }, { name: "", url: "", img: "" },
            { name: "", url: "", img: "" }, { name: "", url: "", img: "" }
        ]
    };
    saveAndRefresh();
    generateSettingsUI();
}

function deleteSection(key) {
    if(confirm("¿Eliminar esta sección?")) {
        delete userData[key];
        saveAndRefresh();
        generateSettingsUI();
    }
}

function saveAndRefresh() {
    localStorage.setItem("naxstart_data", JSON.stringify(userData));
    renderLinks();
}

function toggleSettings() {
    const panel = document.getElementById("settings-panel");
    if (panel) {
        panel.classList.toggle("active");
        panel.style.display = panel.classList.contains("active") ? "block" : "none";
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 's' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        toggleSettings();
    }
});

const themes = {
    default: { name: "NaxStart", background: "#282a36", text: "#f5e2f8", primary: "#ff79c6", contrast: "#282a36", contrast2: "#21222c" },
    tokyoNight: { name: "Tokyo Night", background: "#24283b", text: "#cfc9c2", primary: "#f7768e", contrast: "#414868", contrast2: "#1a1b26" },
    rosepine: { name: "Rosé Pine", background: "#232136", text: "#faf4ed", primary: "#eb6f92", contrast: "#1f1d2e", contrast2: "#191724" },
    white: { name: "White", background: "#cccdcf", text: "#283b49", primary: "#62b3ff", contrast: "#7a7a7a", contrast2: "#afafaf" },
    black: { name: "Black", background: "#020202", text: "#efefef", primary: "#1c1b22", contrast: "#020200", contrast2: "#020200" },
    purple: { name: "Gengar", background: "#3D2E4D", text: "#deb7ff", primary: "#D75054", contrast: "#261F34", contrast2: "#30243D" },
    sand: { name: "Jean Paul", background: "#afa7a5", text: "#201000", primary: "#957e72", contrast: "#afa7a5", contrast2: "#847977" },
    pink: { name: "Pink", background: "#F7BAC4", text: "#201000", primary: "#58C7F2", contrast2: "#F69FA7", contrast: "#F7B0B7" },
    nord: { name: "Mecha", background: "#1f1f1f", text: "#7d7d7d", primary: "#f3fd21", contrast2: "#292929", contrast: "#212121" }
};

function apply_theme(theme) {
    const root = document.documentElement;
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--contrast", theme.contrast);
    root.style.setProperty("--contrast2", theme.contrast2);
}

const themeSelector = document.getElementById("themeSelector");
if(themeSelector) {
    for (const theme in themes) {
        const themeOption = document.createElement("option");
        themeOption.value = theme;
        themeOption.textContent = themes[theme].name;
        themeSelector.appendChild(themeOption);
    }
    themeSelector.onchange = event => {
        apply_theme(themes[event.target.value]);
        localStorage.setItem("theme", event.target.value);
    };
}

const saved_theme = localStorage.getItem("theme");
apply_theme(themes[saved_theme] || themes.default);

document.addEventListener("DOMContentLoaded", () => {
    renderLinks();
    generateSettingsUI();
    const panel = document.getElementById("settings-panel");
    if (panel) {
        panel.classList.remove("active");
        panel.style.display = "none";
    }
});