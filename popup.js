document.getElementById('getAnswerButton').addEventListener('click', function() {
  const query = document.getElementById('queryInput').value;

  chrome.runtime.sendMessage({action: 'fetchAnswer', query: query}, function(response) {
    injectAnswer(response.answer);
  });
});

function injectAnswer(answer) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'injectAnswer', answer: answer});
  });
}
