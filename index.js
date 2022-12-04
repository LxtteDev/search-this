// Strings are awful
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
 * @param {Element} element 
 */
async function getTextcontentWithoutChildren(element) {
    for (let j = 0 ; j < element.childNodes.length; j++) {
        const child = element.childNodes[j]
        
        if (child.length) {
            return child.nodeValue
        }
    }
}

/**
 * @param {String} Term
 */
async function Search(Term) {
    const now = new Date()
    const searchTerm = encodeURIComponent(Term.trim()).replaceAll("%20", "+").replaceAll("%3F", "?")

    const link = `https://www.google.com/search?q=${searchTerm}`
    const html = await requestPage(link)

    let data = {
        "search_info": {
            link: `https://www.google.com/search?q=${html.window.document.getElementsByClassName("noHIxc")[0]?.value.replaceAll("+", "%2B").replaceAll(" ", "+")}`,
            q: html.window.document.getElementsByClassName("noHIxc")[0]?.value,
            created_at: now.toUTCString(),
        },
        "results": []
    }

    // Links
    const links = html.window.document.getElementsByClassName("Gx5Zad fP1Qef xpd EtOod pkphOe")
    for (const index in links) {
        const link = links[index]

        if (Object.prototype.toString.call(link) != "[object HTMLDivElement]") continue
        if (link.id) continue

        const titleParts = link.getElementsByClassName("egMi0 kCrYT")[0]
        const title = titleParts.getElementsByClassName("zBAuLc l97dzf")[0]?.textContent
        const resultLink = titleParts.getElementsByTagName("a")[0].href.split("&sa")[0].slice(7)
        const displayLink = titleParts.getElementsByClassName("BNeawe UPmit AP7Wnd lRVwie")[0]?.textContent

        const contentParts = link.getElementsByClassName("BNeawe s3v9rd AP7Wnd")[0]
        const snippet = await getTextcontentWithoutChildren(contentParts.getElementsByClassName("BNeawe s3v9rd AP7Wnd")[0])
        const date = contentParts.getElementsByClassName("BNeawe s3v9rd AP7Wnd")[0]?.getElementsByClassName("r0bn4c rQMQod")[0]?.textContent

        const result = {
            position: Number(index) + 1,
            title: title,
            link: resultLink,
            displayLink: displayLink,
            snippet: snippet.replaceAll("�", " "),
        }

        if (date) result.date = date

        const siteLinks = link.getElementsByClassName("XLloXe AP7Wnd")
        if (siteLinks.length > 0) {
            const sl = []

            for (const ind in siteLinks) {
                const site = siteLinks[ind]

                if (Object.prototype.toString.call(site) != "[object HTMLSpanElement]") continue

                const info = {
                    title: site.textContent,
                    link: site.parentElement.href.split("&sa")[0].slice(7).replaceAll("%25", "%")
                }

                sl.push(info)
            }

            result.siteLinks = sl
        }

        data.results.push(result)
    }

    // Extra information
    const cards = html.window.document.getElementsByClassName("Gx5Zad xpd EtOod pkphOe")
    for (const index in cards) {
        const card = cards[index]

        if (Object.prototype.toString.call(card) != "[object HTMLDivElement]") continue
        if (card.id) continue

        // Card type testing
        const infoElements = card.getElementsByClassName("r0bn4c rQMQod")
        const statisticsElements = card.getElementsByClassName("AVsepf")
        const cardName = card.getElementsByClassName("K8tyEc")[0]?.textContent
        const videoElements = card.getElementsByClassName("BNeawe deIvCb AP7Wnd")
        const calculatorElement = card.getElementsByClassName("BNeawe iBp4i AP7Wnd")

        // Data results
        if (calculatorElement.length > 0) {
            let question = card.getElementsByClassName("BNeawe tAd8D AP7Wnd")[0].textContent
            const questionElements = card.getElementsByClassName("BNeawe s3v9rd AP7Wnd")
            for (const ind in questionElements) {
                const element = questionElements[ind]
                if (Object.prototype.toString.call(element) != "[object HTMLSpanElement]") continue
                question += element.textContent
            }

            const answer = calculatorElement[0].textContent

            const isExchange = card.getElementsByClassName("uEec3 AP7Wnd")[0]?.textContent == "Disclaimer"
            const isAnswer = question.replaceAll(/[0-9]/gm, "") == question

            if (isExchange) {
                const from = question.replaceAll(/[^a-zA-Z ]/gm, "").trim()
                const to = answer.replaceAll(/[^a-zA-Z ]/gm, "").trim()
                const expression = question.replaceAll(/[^0-9.-]/gm, "").trim()
                const result = answer.replaceAll(/[^0-9.-]/gm, "").trim()

                data.exchange_result = {
                    "from": [ from, expression ],
                    "to": [ to, result ],
                }
            } else if (isAnswer) {
                data.question_result = {
                    "question": question,
                    "answer": answer
                }
            } else {
                data.calculator_result = {
                    "expression": question.replaceAll("=", " ").trim(),
                    "result": Number(answer) || answer
                }
            }

            continue
        }

        // Knowlage Panel
        if (statisticsElements.length > 0) {
            const info = {
                name: card.getElementsByTagName("h3")[0].textContent,
            }

            const titleCard = card.getElementsByClassName("BNeawe tAd8D AP7Wnd")[0]
            const link = titleCard.getElementsByClassName("r0bn4c rQMQod")[0]?.textContent
            const title = titleCard.textContent

            if (link) info.title = title.slice(0, title.length - link.length).replace(/[^\x20-\x7E]/g, '').trim()

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

            // Related searches
            if (cardName == "Related searches") {
                const searches = []

                const relatedPeopleElements = card.getElementsByClassName("duf-h")
                for (const inx in relatedPeopleElements) {
                    const search = relatedPeopleElements[inx].parentElement
                    if (Object.prototype.toString.call(search) != "[object HTMLDivElement]") continue
                    const append = {
                        question: search.getElementsByClassName("Lt3Tzc")[0]?.textContent
                    }

                    // Removed beacuse it dosnt work
                    /* const persons = []
                    const personElements = search.getElementsByClassName("BVG0Nb")
                    for (const ind in personElements) {
                        const person = personElements[ind]
                        if (Object.prototype.toString.call(person) != "[object HTMLAnchorElement]") continue
                        if (person.tagName != "A") continue

                        const name = person.textContent
                        const link = `https://google.com${person.href?.slice(0, 19 + name.length)}`

                        persons.push({
                            name: name,
                            link, link
                        })
                    }

                    if (persons.length > 0) append.people = persons */
                    searches.push(append)
                }

                const searchElements = card.getElementsByClassName("gGQDvd iIWm4b")
                for (const inx in searchElements) {
                    const search = searchElements[inx]
                    if (Object.prototype.toString.call(search) != "[object HTMLDivElement]") continue

                    const link = search.getElementsByTagName("a")[0]?.href

                    const question = {}
                    question.question = search.textContent
                    if (link) question.link = `https://google.com${link.slice(0, 19 + search.textContent.length)}`

                    searches.push(question)
                }

                data.related_searches = searches
                continue
            }

        }

        // Featured video
        if (videoElements.length > 0) {
            const video = {}

            const title = videoElements[0]?.childNodes[0].nodeValue
            console.log(title)
            if (title == undefined || title == null) continue
            if (title.endsWith("- YouTube")) video.title = title.slice(0, title.length - 9).trim()
            if (video.title == undefined) video.title = title

            const link = card.getElementsByClassName("BNeawe tAd8D AP7Wnd")[0].textContent
            video.link = link

            data.featured_video = video
            continue
        }
    }

    const deltaTime = new Date() - now
    data.search_info.time_taken = deltaTime / 1000

    return data
}

module.exports = Search