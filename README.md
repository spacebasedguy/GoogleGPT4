# GoogleGPT4

GoogleGPT4 is a Chrome extension that enhances your Google search experience by injecting AI-generated answers from the GPT-4 model directly into your search results. This provides more relevant and useful information based on your search queries.

**Note:** This is a simple, minimalistic extension with limited functionalities. Feel free to extend its capabilities, add new features, and make improvements!

One unique aspect of this extension is that it allows you to directly use your own OpenAI API key for access. While other similar extensions exist with more functionalities, most of them only support the 3.5 Turbo model or require authorization to access your ChatGPT Plus account. This often leads to consuming a limited number of expensive queries (currently 25 queries every 3 hours). GoogleGPT4 aims to provide a more flexible and customizable solution by enabling you to utilize your own API key for search purposes.

## Prerequisites

To use this extension, you must have beta access to the GPT-4 API. If you don't have access, please join the waitlist here: https://openai.com/waitlist/gpt-4-api

## Features

- Automatically injects GPT-4 generated answers into your Google search results
- Leverages OpenAI's GPT-4 model for high-quality, relevant answers
- Easy-to-use Chrome extension
- Option to separately ask queries by clicking on the extension icon and pressing the button

## Installation

1. Clone or download the repository
2. Open Google Chrome, go to `chrome://extensions/` and enable "Developer mode"
3. Click "Load unpacked" and select the folder containing the GoogleGPT4 extension
4. Add your OpenAI API key to the `background.js` file (replace 'your_api_key_here' with your actual API key)
5. The GoogleGPT4 extension should now be installed and active in your browser

## Usage

1. Open a new tab and navigate to https://www.google.com/
2. Enter a search query and press Enter to view the search results
3. The GPT-4 generated answer will automatically appear on the search results page

**Alternatively:**

1. Click on the GoogleGPT4 extension icon in your browser toolbar
2. Enter your query in the provided text input field
3. Press the "Submit" button to receive the GPT-4 generated answer

## Contributing

If you'd like to contribute to the project, please submit a pull request with your changes or improvements.

## License

MIT License
