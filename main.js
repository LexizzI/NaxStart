"use strict";

const links = document.getElementsByClassName("page-link")
const welcomeMessageText = document.getElementById("welcomeMessageText")

console.log(links)

for (const link of links) {
    console.log(link)

    link.addEventListener("mouseover", event => {
        welcomeMessageText.textContent = event.currentTarget.children[0]["alt"]
    })
};

const themes = {
    default: {
        name: "NaxStart",
        background: "#282a36",
        text: "#f5e2f8",
        primary: "#ff79c6",
        secondary: "#21222c",
        accent: "#ea87b6",
        contrast: "#282a36",
        contrast2: "#21222c",
    },
    tokyoNight: {
        name: "Tokyo Night",
        background: "#24283b",
        text: "#cfc9c2",
        primary: "#f7768e",
        secondary: "#bb9af7",
        accent: "#9ece6a",
        contrast: "#414868",
        contrast2: "#1a1b26",
    },
    
    rosepine: {
        name: "Rosé Pine",
        background: "#232136",
        text: "#faf4ed",
        primary: "#eb6f92",
        secondary: "#3e8fb0",
        accent: "#dfd2d1",
        contrast: "#1f1d2e",
        contrast2: "#191724",
    },
    
    white: {
        name: "White",
        background: "#cccdcf",
        text: "#283b49",
        primary: "#62b3ff",
        secondary: "#ff9dde",
        accent: "#adffb1",
        contrast: "#7a7a7a",
        contrast2: "#afafaf",
    },
    
    black: {
        name: "Black",
        background: "#020202",
        text: "#efefef",
        primary: "#1c1b22",
        contrast: "#020200",
        contrast2: "#020200",
    },
    
    purple: {
        name: "Gengar",
        background: "#3D2E4D",
        text: "#deb7ff",
        primary: "#D75054",
        secondary: "#8549a7",
        accent: "#ffa345",
        contrast: "#261F34",
        contrast2: "#30243D",
    },
    sand: {
        name: "Jean Paul",
        background: "#afa7a5",
        text: "#201000",
        primary: "#957e72",
        secondary: "#8549a7",
        accent: "#ffa345",
        contrast: "#afa7a5",
        contrast2: "#847977",
    },
    pink: {
        name: "Pink",
        background: "#F7BAC4",
        text: "#201000",
        primary: "#58C7F2",
        contrast2: "#F69FA7",
        contrast: "#F7B0B7",
    },
    nord: {
        name: "Mecha",
        background: "#1f1f1f",
        text: "#7d7d7d",
        primary: "#f3fd21",
        contrast2: "#292929",
        contrast: "#212121",
    },

};

function apply_theme(theme) {
    document.documentElement.style.setProperty("--background", theme.background);
    document.documentElement.style.setProperty("--text", theme.text);
    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--secodary", theme.secodary);
    document.documentElement.style.setProperty("--contrast", theme.contrast);
    document.documentElement.style.setProperty("--contrast2", theme.contrast2);
}

const themeSelector = document.getElementById("themeSelector")

for (const theme in themes) {
    const themeOption = document.createElement("option")
    themeOption.value=theme
    themeOption.id=theme

    themeOption.appendChild(document.createTextNode(themes[theme].name))

    themeSelector.appendChild(themeOption)
}

themeSelector.onchange = event => {
    apply_theme(themes[event.target.value])
    localStorage.setItem("theme", event.target.value);
}

const saved_theme = localStorage.getItem("theme");

if (saved_theme !== null) {
    apply_theme(themes[saved_theme])

    const selectedTheme = document.getElementById(saved_theme)
    selectedTheme.selected = true
} else {
    apply_theme(themes.default)
}


let motd = "cosa"

document.getElementById ("footer_text") + "cosa";


