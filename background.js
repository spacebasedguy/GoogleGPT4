chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'www.google.com'},
    })],
    actions: [new chrome.declarativeContent.ShowPageAction()]}]);
  });
});

function fetchAnswer(query, callback) {
  const apiKey = 'your_api_key_here';
  const url = 'https://api.openai.com/v1/chat/completions';

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      'model': 'gpt-4',
      'messages': [{
        'role': 'system',
        'content': 'You are a helpful assistant.'
      }, {
        'role': 'user',
        'content': query
      }],
      'temperature': 0.7
    })
  };

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      const answer = data.choices[0].message.content;
      callback(answer);
    })
    .catch(error => console.error('Error fetching AI-generated answer:', error));
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'fetchAnswer') {
    fetchAnswer(request.query, function(answer) {
      sendResponse({answer: answer});
    });
  }

  return true;
});
