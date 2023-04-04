(function() {
    const sendBtn = document.querySelector('#send');
    const messages = document.querySelector('#messages');
    const messageBox = document.querySelector('#messageBox');

    let ws;

    function showMessage(message) {
        if (message !== null && message !== undefined && message !== '') {
            messages.textContent += `\n\n${message}`;
            messages.scrollTop = messages.scrollHeight;
            messageBox.value = '';
        } else {
            console.error("Message is empty! Your message: ", message);
        }
    }

    function init() {
        if (ws) {
            ws.onerror = ws.onopen = ws.onclose = null;
            ws.close();
        }

        ws = new WebSocket('ws://localhost:8080');
        ws.onopen = () => {
            console.log('Connection opened!');
        }
        ws.onmessage = ({ data }) => showMessage(data);

        ws.onclose = function(event) {
            console.log(`WebSocket is closed now. Code: ${event.code}, Reason: ${event.reason}`);
            ws = null;
        };

        ws.onerror = function(event) {
            console.error(`WebSocket error observed: ${event}`);
        };
    }

    sendBtn.onclick = function() {
        if (!ws) {
            showMessage("No WebSocket connection :(");
            return ;
        }

        ws.send(messageBox.value);
        showMessage(messageBox.value);
    }
    init();
})();