"use strict";

const defaultData = {
    work: {
        title: "Work",
        links: [
            { name: "Mail", url: "https://mail.google.com", img: "img/mail.png" },
            { name: "GitHub", url: "https://github.com", img: "img/github.png" },
            { name: "", url: "", img: "" }, { name: "", url: "", img: "" }
        ]
    },
    social: {
        title: "Social",
        links: [
            { name: "Youtube", url: "https://youtube.com", img: "img/youtube.png" },
            { name: "", url: "", img: "" }, { name: "", url: "", img: "" }, { name: "", url: "", img: "" }
        ]
    },
    streaming: {
        title: "Streaming",
        links: [
            { name: "Netflix", url: "https://netflix.com", img: "img/netflix.png" },
            { name: "", url: "", img: "" }, { name: "", url: "", img: "" }, { name: "", url: "", img: "" }
        ]
    }
};

const quotes = [
    "Believe in yourself!",
    "Stay focused, stay humble.",
    "Make it happen.",
    "Small steps every day.",
    "Your only limit is your mind.",
    "Keep pushing forward.",
    "Work hard in silence.",
    "Dream big, do bigger.",
    "Consistency is key.",
    "Focus on the goal."
];

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

let userData = JSON.parse(localStorage.getItem("naxstart_data")) || defaultData;

function apply_theme(theme) {
    const root = document.documentElement;
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--contrast", theme.contrast);
    root.style.setProperty("--contrast2", theme.contrast2);
}

function initThemeSystem() {
    const themeSelector = document.getElementById("themeSelector");
    if (themeSelector) {
        themeSelector.innerHTML = ""; 
        for (const key in themes) {
            const opt = document.createElement("option");
            opt.value = key;
            opt.textContent = themes[key].name;
            themeSelector.appendChild(opt);
        }
        themeSelector.onchange = (e) => {
            const selected = themes[e.target.value];
            apply_theme(selected);
            localStorage.setItem("theme", e.target.value);
        };
        const saved = localStorage.getItem("theme") || "default";
        themeSelector.value = saved;
        apply_theme(themes[saved]);
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

function initQuoteSystem() {
    const quoteContainer = document.getElementById("quote-box");
    if (quoteContainer) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteContainer.textContent = randomQuote;
    }
}

function generateSettingsUI() {
    const container = document.getElementById("settings-controls");
    if (!container) return;
    container.innerHTML = "";

    for (const key in userData) {
        const group = document.createElement("div");
        group.style.marginBottom = "20px";
        group.innerHTML = `<input type="text" value="${userData[key].title}" oninput="updateTitle('${key}', this.value)" style="background:transparent; color:var(--primary); border:none; border-bottom:1px solid var(--primary); width:100%; font-weight:bold; margin-bottom:10px;">`;

        userData[key].links.forEach((link, i) => {
            const row = document.createElement("div");
            row.style.cssText = "background:var(--contrast); padding:5px; border-radius:5px; margin-bottom:5px;";
            row.innerHTML = `
                <input type="text" placeholder="Name" value="${link.name || ''}" oninput="updateLink('${key}', ${i}, 'name', this.value)" style="width:100%; font-size:10px; background:var(--background); color:var(--text); border:1px solid var(--primary); margin-bottom:2px;">
                <input type="text" placeholder="URL" value="${link.url}" oninput="updateLink('${key}', ${i}, 'url', this.value)" style="width:100%; font-size:10px; background:var(--background); color:var(--text); border:1px solid var(--primary); margin-bottom:2px;">
                <input type="text" placeholder="Icon" value="${link.img}" oninput="updateLink('${key}', ${i}, 'img', this.value)" style="width:100%; font-size:10px; background:var(--background); color:var(--text); border:1px solid var(--primary);">
            `;
            group.appendChild(row);
        });
        container.appendChild(group);
    }

    const actions = document.createElement("div");
    actions.innerHTML = `
        <button onclick="exportJSON()" style="width:100%; background:var(--primary); color:var(--background); border:none; padding:8px; border-radius:4px; font-weight:bold; cursor:pointer; margin-top:10px;">SAVE CONFIG</button>
        <label style="display:block; width:100%; text-align:center; margin-top:5px; cursor:pointer; border:1px solid var(--primary); font-size:10px; padding:3px;">
            LOAD CONFIG <input type="file" accept=".json" onchange="importJSON(event)" style="display:none;">
        </label>
    `;
    container.appendChild(actions);
}

function updateTitle(key, val) { userData[key].title = val; save(); }
function updateLink(key, i, f, v) { userData[key].links[i][f] = v; save(); }
function save() { localStorage.setItem("naxstart_data", JSON.stringify(userData)); renderLinks(); }

function exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userData, null, 4));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", "config.json");
    dl.click();
}

function importJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { 
        try {
            userData = JSON.parse(ev.target.result); 
            save(); 
            generateSettingsUI(); 
        } catch(err) {
            alert("Error: Invalid JSON");
        }
    };
    reader.readAsText(file);
}

function setupHoverEffect() {
    const links = document.querySelectorAll(".page-link");
    const welcome = document.getElementById("welcomeMessageText");
    links.forEach(l => {
        l.onmouseover = () => { if(welcome) welcome.textContent = l.title || "Link"; };
        l.onmouseout = () => { if(welcome) welcome.textContent = "Welcome to NaxStart"; };
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 's' && e.target.tagName !== 'INPUT') {
        const panel = document.getElementById("settings-panel");
        if (panel) panel.classList.toggle("active");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    initThemeSystem(); 
    initQuoteSystem();
    renderLinks();
    generateSettingsUI();
});