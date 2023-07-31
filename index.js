document.addEventListener("DOMContentLoaded", () => {
  const leftContainer = document.querySelector(".left-container");
  const rightContainer = document.querySelector(".right-container");
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-button");


  searchButton.addEventListener("click", () => {
    const wordSearched = searchInput.value.trim();
    const dictionarySite = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearched}`;

    fetch(dictionarySite)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const wordData = data[0];
          const apiOutput = `
                <div class="output-words">
                  <h2>${wordData.word}</h2>
                  <p>Phonetic: ${wordData.phonetic || "Not Available"}</p>
                  <p>Origin: ${wordData.origin || "Not Available"}</p>
                  <h3>Definitions:</h3>
                  ${getDefinitions(wordData.meanings)}
                </div>
              `;
          leftContainer.innerHTML = apiOutput;
        } else {
          leftContainer.innerHTML = `<p>Sorry Chief, can't find anything for ya, relating to the word "${wordSearched}".</p>`;
        }
      })
      .catch((error) => {
        console.error("Can't find data:", error);
        leftContainer.innerHTML = "<p>Can't find data.</p>";
      });
  });

});

function getDefinitions(definitions) {
  return definitions
    .map((definition) => {
      return `
            <div class="definition">
              <p><strong>${definition.partOfSpeech}</strong>: ${definition.definitions[0].definition
        }</p>
              ${definition.definitions[0].example
          ? `<p>Example: ${definition.definitions[0].example}</p>`
          : ""
        }
            </div>
          `;
    })
    .join("");
}
