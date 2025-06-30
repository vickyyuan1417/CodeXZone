const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const log = document.getElementById('chat-log');

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = sender;
  msg.textContent = text;
  log.appendChild(msg);
  log.scrollTop = log.scrollHeight;
}

function typeText(element, text, delay = 30) {
  element.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    element.textContent += text.charAt(i);
    i += 1;
    if (i >= text.length) {
      clearInterval(timer);
    }
  }, delay);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userText = input.value.trim();
  if (!userText) return;
  appendMessage('user', userText);
  input.value = '';

  const botMsg = document.createElement('div');
  botMsg.className = 'bot';
  botMsg.textContent = '...';
  log.appendChild(botMsg);
  log.scrollTop = log.scrollHeight;

  const response = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userText })
  });
  const data = await response.json();
  typeText(botMsg, data.reply);
});
