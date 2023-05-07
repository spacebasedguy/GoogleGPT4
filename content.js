let lastInjectedQuery = null;

function injectStyle() {
  const style = document.createElement('style');
  style.innerHTML = `
    .gpt4-answer-container {
      font-family: 'Roboto', Arial, sans-serif;
      margin: 20px 0;
      padding: 20px;
      background-color: #f7f7f7;
      border-radius: 5px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }

    .gpt4-answer-container h2 {
      font-size: 20px;
      font-weight: 500;
      color: #333;
      margin: 0 0 10px;
    }

    .gpt4-answer-container p {
      font-size: 16px;
      font-weight: 300;
      color: #666;
      margin: 0;
    }
  `;
  document.head.appendChild(style);
}

function injectAnswer(answer, query) {
  if (lastInjectedQuery === query) return;

  const searchResultsContainer = document.querySelector('#search');

  const answerContainer = document.createElement('div');
  answerContainer.className = 'gpt4-answer-container';
  answerContainer.innerHTML = `
    <h2>GPT-4 Generated Answer:</h2>
    <p>${answer}</p>
  `;

  searchResultsContainer.insertBefore(answerContainer, searchResultsContainer.firstChild);
  lastInjectedQuery = query;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'injectAnswer') {
    injectStyle();
    injectAnswer(request.answer, request.query);
  }
});

function getSearchQuery() {
  const searchInput = document.querySelector('input[name="q"]');
  return searchInput ? searchInput.value : null;
}

function handleSearchResults() {
  const query = getSearchQuery();
  if (query) {
    chrome.runtime.sendMessage({ action: 'fetchAnswer', query: query }, function (response) {
      injectAnswer(response.answer, query);
    });
  }
}

function observeSearchResults() {
  const targetNode = document.querySelector('#search');

  if (targetNode) {
    const observerConfig = {
      childList: true,
      subtree: true,
    };

    const observerCallback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          observer.disconnect();
          handleSearchResults();
          setTimeout(() => {
            observeSearchResults();
          }, 1000);
          break;
        }
      }
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(targetNode, observerConfig);
  }
}

if (window.location.pathname.includes('/search')) {
  observeSearchResults();
}
