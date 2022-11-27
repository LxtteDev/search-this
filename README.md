# search-this

Google search API that I made because I didnt want to pay for [SerpAPI](https://serpapi.com/). It dosnt require any keys or authorization. Just search and get a JSON response that includes the search info, featured snippets, realated questons, information found on the knowledge panel, information in the info card, info in the featured video, partial support for related searches (Currently no names on the searches with drop downs), and calculator results.

## Install
```
npm install search-this
```

## Usage
```js
const search = require("search-this")

(async () => {
    const response = await search("Who is joe biden?")
    console.log(response)
})()
```
**Output:**
```json
{
  "search_info": {
    "link": "https://www.google.com/search?q=Who+is+joe+biden?",
    "q": "Who is joe biden?",
    "created_at": "Before the latest update",
    "time_taken": 0
  },
  "featured_snippets": {
    "description": "A member of the Democratic Party, he previously served as the 47th vice president from 2009 to 2017 under President Barack Obama, and represented Delaware in the United States Senate from 1973 to 2009. Joseph Robinette Biden Jr. Scranton, Pennsylvania, U.S.",
    "source": {
      "name": "Wikipedia",
      "link": "en.wikipedia.org/wiki/Joe_Biden"
    }
  },
  "related_questions": [
    {
      "question": "Who is the 47th president of the USA?"
    },
    {
      "question": "How old is Joe Biden's wife?"
    },
    {
      "question": "What type of car does Joe Biden drive?"
    },
    {
      "question": "Who is the oldest president?"
    }
  ],
  "knowledge_panel": {
    "name": "Joe Biden",
    "title": "46th U.S. President",
    "description": "Joseph Robinette Biden Jr. is an American politician who is the 46th and current president of the United States. A member of the Democratic Party, he previously served as the 47th vice president from 2009 to 2017 under President Barack Obama, and...",
    "source": {
      "name": "Wikipedia",
      "link": "https://en.wikipedia.org/wiki/Joe_Biden"
    },
    "information": {
      "born": "November 20, 1942 (age 80 years), Scranton, PA",
      "height": "6′ 0″",
      "party": "Democratic Party",
      "spouse": "Neilia Hunter (m. 1966–1972)",
      "presidential term": "January 20, 2021 –",
      "children": "Hunter Biden, Naomi Biden, Ashley Biden, and more",
      "grandchildren": "Navy Joan Roberts, Robert Biden II, Maisy Biden, and more"
    }
  },
  "related_searches": [
    {
      "question": "Joe Biden net worth",
      "link": "https://google.com/search?ie=UTF-8&q=Joe+Biden+net+worth"
    },
    {
      "question": "Young Joe Biden",
      "link": "https://google.com/search?ie=UTF-8&q=Young+Joe+Biden"
    },
    {
      "question": "How old is Joe Biden",
      "link": "https://google.com/search?ie=UTF-8&q=How+old+is+Joe+Biden"
    },
    {
      "question": "Jill Biden",
      "link": "https://google.com/search?ie=UTF-8&q=Jill+Biden"
    },
    {
      "question": "When was Joe Biden elected",
      "link": "https://google.com/search?ie=UTF-8&q=When+was+Joe+Biden+elected"
    },
    {
      "question": "Joe Biden wife",
      "link": "https://google.com/search?ie=UTF-8&q=Joe+Biden+wife"
    },
    {
      "question": "Joe Biden first wife",
      "link": "https://google.com/search?ie=UTF-8&q=Joe+Biden+first+wife"
    },
    {
      "question": "Joe Biden family",
      "link": "https://google.com/search?ie=UTF-8&q=Joe+Biden+family"
    }
  ]
}
```
## License
The MIT License (MIT).
Fork it, cry when you read it, give up trying to understand it. Do whatever you want with this.

## Support
If you really like this project please consider [buying me a coffee](https://www.buymeacoffee.com/lxttedeveloper).
