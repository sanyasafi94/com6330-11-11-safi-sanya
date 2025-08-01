const getPoemBtn = document.getElementById("get-poem");
const poemEl = document.getElementById("poem");
const poemURL =
  "https://poetrydb.org/random,linecount/1;12/author,title,lines.json";

const getJSON = (url) => fetch(url).then((res) => res.json());

const pipe =
  (...fns) =>
  (firstArg) =>
    fns.reduce((returnValue, fn) => fn(returnValue), firstArg);

const makeTag = (tag) => (str) => `<${tag}>${str}</${tag}>`;

// complete this function
const makePoemHTML = ([poem]) => {
  if (!poem || !poem.title || !poem.author || !Array.isArray(poem.lines)) {
    return makeTag("p")(
      "Failed to load poem or invalid poem data. Please try again."
    );
  }

  const titleHTML = pipe(makeTag("h2"))(poem.title);
  const makeEm = makeTag("em");
  const authorText = `by ${poem.author}`;
  const authorHTML = pipe(makeEm, makeTag("h3"))(authorText);

  let stanzaHTML = "";
  let currentStanzaLines = [];

  poem.lines.forEach((line, index) => {
    if (line === "" && currentStanzaLines.length > 0) {
      stanzaHTML += makeTag("p")(currentStanzaLines.join("<br>"));
    } else if (line !== "") {
      currentStanzaLines.push(line);
    }
    if (index === poem.lines.length - 1 && currentStanzaLines.length > 0) {
      stanzaHTML += makeTag("p")(currentStanzaLines.join("<br>"));
    }
  });
  return `${titleHTML}${authorHTML}${stanzaHTML}`;
};

// attach a click event to #get-poem
getPoemBtn.onclick = async function () {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL));
};
