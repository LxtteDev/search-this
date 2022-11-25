// Your swimming in dangerous waters
const jsdom = require("jsdom");
const superagent = require('superagent')

/**
 * @param {String} Link
 * @returns {jsdom.JSDOM}
 */
async function requestPage(Link) {
    const response = await superagent.get(Link)

    const html = new jsdom.JSDOM(response.text)

    return html
}

/**
 * @param {String} Term
 */
async function Search(Term) {
    const now = new Date()
    const searchTerm = Term.replaceAll(" ", "+")

    const link = `https://www.google.com/search?q=${searchTerm}`
    const html = await requestPage(link)

    let data = {
        "search_info": {
            link: `https://www.google.com/search?q=${html.window.document.getElementsByClassName("noHIxc")[0]?.value.replaceAll(" ", "+")}`,
            q: html.window.document.getElementsByClassName("noHIxc")[0]?.value,
            created_at: now.toUTCString(),
        }
    }

    const cards = html.window.document.getElementsByClassName("Gx5Zad xpd EtOod pkphOe")
    for (const index in cards) {
        const card = cards[index]

        if (Object.prototype.toString.call(card) != "[object HTMLDivElement]") continue
        if (card.id) continue

        // Card type testing
        const infoElements = card.getElementsByClassName("r0bn4c rQMQod")
        const statisticsElements = card.getElementsByClassName("AVsepf")
        const cardName = card.getElementsByClassName("FCUp0c rQMQod")[0]?.textContent
        const videoElements = card.getElementsByClassName("BNeawe deIvCb AP7Wnd")

        // Knowlage Panel
        if (statisticsElements.length > 0) {
            const info = {
                name: card.getElementsByTagName("h3")[0].textContent,
            }

            const titleCard = card.getElementsByClassName("BNeawe tAd8D AP7Wnd")[0]
            const link = titleCard.getElementsByClassName("r0bn4c rQMQod")[0]?.textContent
            const title = titleCard.textContent

            info.title = title.slice(0, title.length - link.length).replace(/[^\x20-\x7E]/g, '').trim()

            const descriptionElements = card.getElementsByClassName("BNeawe s3v9rd AP7Wnd")
            for (const index in descriptionElements) {
                const element = descriptionElements[index]
                if (!element.textContent) continue

                const linkName = element.getElementsByClassName("XLloXe AP7Wnd")[0].textContent
                const description = element.textContent

                const link = element.getElementsByTagName("a")[0].href.slice(7).split("&")[0]

                info.description = description.slice(0, description.length - linkName.length).replace(/[^\x20-\x7E]/g, '').trim()
                info.source = {
                    name: linkName,
                    link: link

                }

                break
            }

            const stats = {}
            const statsElements = card.getElementsByClassName("AVsepf")
            for (const index in statsElements) {
                const stat = statsElements[index]
                if (Object.prototype.toString.call(stat) != "[object HTMLDivElement]") continue

                const title = stat.getElementsByClassName("BNeawe s3v9rd AP7Wnd")[1].textContent.toLowerCase().replace(/[^\x20-\x7E]/g, '').trim()
                const info = stat.getElementsByClassName("BNeawe tAd8D AP7Wnd")[0].textContent.replace(/[^\x20-\x7E\′\″\–]/g, ' ').trim()

                stats[title] = info
            }

            info.information = stats
            data.knowledge_panel = info
            continue
        }

        // Featured snippets
        if (infoElements.length > 0) {
            for (const inx in infoElements) {
                const type = infoElements[inx].textContent
                if (type == undefined) continue

                if (type == "About Featured Snippets" && !data.featured_snippets) {
                    const featured = {}
    
                    const content = card.getElementsByClassName("BNeawe s3v9rd AP7Wnd")
                    for (const idx in content) {
                        if (Object.prototype.toString.call(card) != "[object HTMLDivElement]") continue
    
                        if (content[idx].textContent) featured.description = content[idx].textContent; break
                    }
    
                    const name = card.getElementsByClassName("rQMQod Xb5VRe")[0]?.textContent
                    const source = card.getElementsByClassName("BNeawe UPmit AP7Wnd")[0]?.textContent
                    if (source && name) featured.source = { name: name.split("-")[1].trim(), link: source.replaceAll("›", "/").replaceAll(" ", "") }
    
                    data.featured_snippets = featured
                }
            }

            continue
        }

        // Related questions
        if (cardName) {
            // People also ask
            if (cardName == "People also ask") {
                const questions = []

                const questionsElements = card.getElementsByClassName("fLtXsc iIWm4b")
                for (const ind in questionsElements) {
                    const question = questionsElements[ind]
                    if (Object.prototype.toString.call(question) != "[object HTMLDivElement]") continue

                    const questionData = {
                        question: question.getElementsByClassName("Lt3Tzc")[0]?.textContent
                    }

                    const questionCard = question.parentElement.parentElement

                    questions.push(questionData)
                }

                data.related_questions = questions
                continue
            }
        }

        // Featured video
        if (videoElements.length > 0) {
            const video = {}

            const title = videoElements[0]?.textContent
            const link = card.getElementsByClassName("BNeawe tAd8D AP7Wnd")[0].textContent


            if (title.endsWith("- YouTube")) video.title = title.slice(0, title.length - 9).trim()
            
            video.link = link
            data.featured_video = video
            continue
        }

    }

    const deltaTime = new Date() - now
    data.search_info.time_taken = deltaTime / 100

    return data
}

module.exports = Search