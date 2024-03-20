const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/chat/completions';

const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatWindow = document.getElementById('chat-window');
const userMessage = document.createElement('div');

let controller = null;


const generate = async () => {
    if (userInput.value.trim() == "") {
        alert("Please enter a question.");
        return;
    }

    const userMessage = document.createElement('div'); // Create a new div for the user message
    userMessage.className = 'message user-message';
    userMessage.textContent = userInput.value.trim();
    chatWindow.appendChild(userMessage);

    const inputContext = userInput.value;
    userInput.value = '';

    sendButton.disabled = true;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: inputContext}],
            }),
        });

        const data = await response.json();

        const botMessage = document.createElement('div'); // Create a new div for the bot message
        botMessage.className = 'message bot-message';
        botMessage.textContent = data.choices[0].message.content;
        chatWindow.appendChild(botMessage);

        chatWindow.appendChild(document.createElement('br')); // Add a line break after bot's response

    } catch (error) {
        console.error("Error:", error);
        resultText.innerText = "Error occurred while generating.";
    } finally {
        sendButton.disabled = false;
    }
};
document.addEventListener("DOMContentLoaded", function() {
    // Your existing code here...

    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', function () {
        // Handle back button click here
        // For example, you can navigate to the previous page using history.back()
        history.back();
    });

});

sendButton.addEventListener('click', generate);
// Allow user to send message with "Enter" key
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        generate();
    }
});

