# search-this

Google search API that I made because I didnt want to pay for [SerpAPI](https://serpapi.com/). It dosnt require any keys or authorization. Just search and get a JSON response that includes the search info, featured snippets, realated questons, information found on the knowledge panel, information in the info card, info in the featured video, partial support for related searches (Currently no names on the searches with drop downs), calculator results, organic link results, and currency exchanging.

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
    "created_at": "The pentagon",
    "time_taken": 0
  },
  "results": [
    {
      "position": 1,
      "title": "Joe Biden: The President | The White House",
      "link": "https://www.whitehouse.gov/administration/president-biden/",
      "snippet": "President Biden represented Delaware for 36 years in the U.S. Senate before becoming the 47th Vice President of the United States. As President, Biden will ..."
    },
    {
      "position": 2,
      "title": "Joe Biden | Biography, Family, Policies, & Facts | Britannica",
      "link": "https://www.britannica.com/biography/Joe-Biden",
      "snippet": "Joe Biden, byname of Joseph Robinette Biden, Jr., (born November 20, 1942, Scranton, Pennsylvania, U.S.), 46th president of the United ...",
      "date": "Nov 16, 2022",
      "siteLinks": [
        {
          "title": "Facts & Related Content",
          "link": "https://www.britannica.com/facts/Joe-Biden"
        },
        {
          "title": "Joe Biden summary",
          "link": "https://www.britannica.com/summary/Joe-Biden"
        },
        {
          "title": "Kamala Harris",
          "link": "https://www.britannica.com/biography/Kamala-Harris"
        }
      ]
    },
    {
      "position": 3,
      "title": "Vice President Joe Biden - Obama White House Archives",
      "link": "https://obamawhitehouse.archives.gov/vp",
      "snippet": "Joseph Robinette Biden, Jr., represented Delaware for 36 years in the U.S. Senate before becoming the 47th and current Vice President of the United States."
    },
    {
      "position": 4,
      "title": "Vice President Joe Biden | The White House",
      "link": "https://obamawhitehouse.archives.gov/realitycheck/node/110",
      "snippet": "Joseph Robinette Biden, Jr., was born November 20, 1942, in Scranton, Pennsylvania, the first of four siblings. In 1953, the Biden family moved from ..."
    },
    {
      "position": 5,
      "title": "Joe Biden: Life Before the Presidency - Miller Center",
      "link": "https://millercenter.org/joe-biden-life-presidency",
      "snippet": "Joseph Robinette Biden Jr. was born on November 20, 1942, in Scranton, Pennsylvania, as World War II raged overseas. The first child of Catherine Eugenia ..."
    },
    {
      "position": 6,
      "title": "Joe Biden - Business Standard",
      "link": "https://www.business-standard.com/about/who-is-joe-biden",
      "snippet": "A member of the Democratic Party, he served as the 47th vice president from 2009 to 2017 under Barack Obama and represented Delaware in the United States Senate ..."
    },
    {
      "position": 7,
      "title": "Joe Biden - Official Campaign Page - Joe Biden for President ...",
      "link": "https://joebiden.com/",
      "snippet": "Donate now to help elect Democrats up and down the ballot ... The Democratic Party is responsible for electing Democrats from the school board to the White House."
    }
  ],
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

## Issues
If you have any issues or error please report it so I can fix them.

## License
The MIT License (MIT)

Fork it, cry when you read it, give up trying to understand it. Do whatever you want with this.

## Support
If you really like this project please consider [buying me a coffee](https://www.buymeacoffee.com/lxttedeveloper).
