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
    for (const sectionKey in userData) {
        const grid = document.getElementById(`grid-${sectionKey}`);
        const titleElement = document.getElementById(`name-${sectionKey}`);
        
        if (!grid || !titleElement) continue;

        titleElement.innerHTML = `<img src="${userData[sectionKey].icon}">${userData[sectionKey].title}`;

        grid.innerHTML = "";
        userData[sectionKey].links.forEach(link => {
            if (link.url) {
                const linkHTML = `
                    <a href="${link.url}" target="_blank" class="page-link" title="${link.name}">
                        <img src="${link.img}" alt="${link.name}" class="link-img">
                    </a>`;
                grid.innerHTML += linkHTML;
            }
        });
    }
    setupHoverEffect();
}

function setupHoverEffect() {
    const links = document.getElementsByClassName("page-link");
    const welcomeMessageText = document.getElementById("welcomeMessageText");

    for (const link of links) {
        link.addEventListener("mouseover", event => {
            const imgAlt = event.currentTarget.querySelector('img').alt;
            welcomeMessageText.textContent = imgAlt;
        });
        link.addEventListener("mouseout", () => {
            welcomeMessageText.textContent = "Welcome to NaxStart";
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
        group.innerHTML = `<h4 style="color:var(--primary); text-transform:uppercase; margin-bottom:10px; font-size:0.8em; border-bottom:1px solid var(--primary)">${userData[key].title}</h4>`;

        userData[key].links.forEach((link, i) => {
            const row = document.createElement("div");
            row.style.cssText = "background:var(--contrast); padding:8px; border-radius:6px; margin-bottom:10px;";
            
            row.innerHTML = `
                <div style="margin-bottom:5px">
                    <label style="font-size:9px; color:var(--primary); display:block">NOMBRE</label>
                    <input type="text" value="${link.name}" oninput="updateData('${key}', ${i}, 'name', this.value)" style="width:100%; background:var(--background); color:var(--text); border:1px solid var(--primary); font-size:11px; padding:2px">
                </div>
                <div style="margin-bottom:5px">
                    <label style="font-size:9px; color:var(--primary); display:block">URL</label>
                    <input type="text" value="${link.url}" oninput="updateData('${key}', ${i}, 'url', this.value)" style="width:100%; background:var(--background); color:var(--text); border:1px solid var(--primary); font-size:11px; padding:2px">
                </div>
                <div>
                    <label style="font-size:9px; color:var(--primary); display:block">ICONO (Ruta)</label>
                    <input type="text" value="${link.img}" oninput="updateData('${key}', ${i}, 'img', this.value)" style="width:100%; background:var(--background); color:var(--text); border:1px solid var(--primary); font-size:11px; padding:2px">
                </div>
            `;
            group.appendChild(row);
        });
        container.appendChild(group);
    }
}

function updateData(sectionKey, index, field, value) {
    userData[sectionKey].links[index][field] = value;
    localStorage.setItem("naxstart_data", JSON.stringify(userData));
    renderLinks();
}

function toggleSettings() {
    const panel = document.getElementById("settings-panel");
    if (panel) {
        panel.classList.toggle("active");
        
        if (!panel.classList.contains("active")) {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
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
if (saved_theme && themes[saved_theme]) {
    apply_theme(themes[saved_theme]);
    if(themeSelector) themeSelector.value = saved_theme;
} else {
    apply_theme(themes.default);
}

document.addEventListener("DOMContentLoaded", () => {
    renderLinks();
    generateSettingsUI();
    
    const panel = document.getElementById("settings-panel");
    if (panel) {
        panel.classList.remove("active");
        panel.style.display = "none";
    }

});