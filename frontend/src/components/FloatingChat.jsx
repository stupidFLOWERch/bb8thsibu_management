import { useRef, useState, useEffect } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";
import { askChatbot } from "../api/chatbot";
import "./FloatingChat.css";

function FloatingChat() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const chatEndRef = useRef(null);
    const user = JSON.parse(localStorage.getItem("user"));
    
    const sessionId = user.userId;

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const loadWelcomeMessage = async () => {
            try {
                const data = await askChatbot("hello", sessionId);
    
                setMessages([
                    {
                        sender: "bot",
                        text: data.answer,
                    },
                ]);
            } catch (err) {
                console.error(err);
            }
        };
    
        loadWelcomeMessage();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleChat = () => setOpen(prev => !prev);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMsg = {
            sender: "user",
            text: message,
        };

        setMessages(prev => [...prev, userMsg]);

        const currentMessage = message;
        setMessage("");

        try {
            const data = await askChatbot(currentMessage, sessionId);

            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: data.answer,
                },
            ]);
        } catch (err) {
            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: "Server error",
                },
            ]);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button className="chat-fab" onClick={toggleChat}>
                {open ? <FiX /> : <FiMessageCircle />}
            </button>

            {/* Chat Panel */}
            {open && (
                <div className="chat-panel">
                    <div className="chat-header">
                        <span>Uniform Manual Chatbot</span>
                    </div>

                    <div className="chat-body">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={
                                    msg.sender === "user"
                                        ? "msg user"
                                        : "msg bot"
                                }
                            >
                                {msg.text}
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="chat-input">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") sendMessage();
                            }}
                            placeholder="Type message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default FloatingChat;