/* =========================================
   PETRO-AI CHATBOT
========================================= */


/* =========================================
   DOM ELEMENTS
========================================= */

const chatOverlay =
    document.getElementById(
        "chatOverlay"
    );


const chatMessages =
    document.getElementById(
        "chatMessages"
    );


const chatInput =
    document.getElementById(
        "chatInput"
    );


/* =========================================
   OPEN CHATBOT
========================================= */

document
    .getElementById("floatingAI")
    .addEventListener(
        "click",
        openChat
    );


document
    .getElementById("openChatButton")
    .addEventListener(
        "click",
        openChat
    );


function openChat() {

    chatOverlay.classList.add(
        "open"
    );

    chatInput.focus();

}


/* =========================================
   CLOSE CHATBOT
========================================= */

document
    .getElementById("closeChat")
    .addEventListener(
        "click",
        () => {

            chatOverlay.classList.remove(
                "open"
            );

        }
    );


/* =========================================
   CHAT FORM
========================================= */

document
    .getElementById("chatForm")
    .addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            sendMessage();

        }
    );


/* =========================================
   QUICK PROMPTS
========================================= */

document
    .querySelectorAll(
        ".quick-prompts button"
    )
    .forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    chatInput.value =
                        button.textContent.trim();

                    sendMessage();

                }
            );

        }
    );


/* =========================================
   SEND MESSAGE TO BACKEND
========================================= */

async function sendMessage() {

    const question =
        chatInput.value.trim();


    /* Ignore empty messages */

    if (!question) {

        return;

    }


    /* Show user message */

    addMessage(
        question,
        "user"
    );


    /* Clear input */

    chatInput.value = "";


    /* Show thinking message */

    const thinkingMessage =
        addMessage(
            "PETRO-AI is thinking... 🤖",
            "bot"
        );


    try {

        /* =========================================
           CALL BACKEND API
        ========================================= */

        const apiResponse =
            await fetch(
                "/api/chat",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            question:
                                question

                        })

                }
            );


        /* Convert response to JSON */

        const data =
            await apiResponse.json();


        /* Remove thinking message */

        thinkingMessage.remove();


        /* Handle backend error */

        if (!apiResponse.ok) {

            throw new Error(

                data.error ||
                "AI service unavailable."

            );

        }


        /* =========================================
           SHOW PETRO-AI RESPONSE
        ========================================= */

        addMessage(

            data.answer,

            "bot"

        );

    }


    catch (error) {

        console.error(
            "PETRO-AI Error:",
            error
        );


        /* Remove thinking message */

        thinkingMessage.remove();


        /* Show user-friendly error */

        addMessage(

            "Sorry, I'm unable to connect " +
            "to PETRO-AI right now. " +
            "Please try again in a moment. 🤖",

            "bot"

        );

    }

}


/* =========================================
   ADD MESSAGE
========================================= */

function addMessage(
    message,
    type
) {

    const element =
        document.createElement(
            "div"
        );


    element.className =
        type === "user"
            ? "user-message"
            : "bot-message";


    element.textContent =
        message;


    chatMessages.appendChild(
        element
    );


    /* Scroll to latest message */

    chatMessages.scrollTop =
        chatMessages.scrollHeight;


    return element;

}