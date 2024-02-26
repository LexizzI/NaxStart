const links = document.getElementsByClassName("page-link")
const welcomeMessageText = document.getElementById("welcomeMessageText")

console.log(links)

for (const link of links) {
    console.log(link)

    link.addEventListener("mouseover", event => {
        welcomeMessageText.textContent = event.currentTarget.children[0]["alt"]
    })
};
