import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import './App.css';
// At the top of the file, before the App component
const vscode = window.acquireVsCodeApi ? window.acquireVsCodeApi() : null;
function App() {
    const [messages, setMessages] = useState([
        { id: 1, role: 'ai', content: 'Hello! How can I help you today? (Try @filename to attach a file)' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    // Highlight code blocks after render
    useEffect(() => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }, [messages]);
    // Listen for messages from the extension backend
    useEffect(() => {
        function handleMessage(event) {
            const { type, content, attachment } = event.data || {};
            if (type === 'ai-response') {
                setMessages((msgs) => [
                    ...msgs,
                    { id: msgs.length + 1, role: 'ai', content }
                ]);
                setLoading(false);
            }
            else if (type === 'file-attachment') {
                setMessages((msgs) => [
                    ...msgs,
                    {
                        id: msgs.length + 1,
                        role: 'user',
                        content: input,
                        attachment
                    }
                ]);
                setInput('');
            }
        }
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [input]);
    // Detect @filename pattern
    function hasAtFilename(text) {
        return /@\w+/.test(text);
    }
    const sendMessage = () => {
        if (!input.trim())
            return;
        if (hasAtFilename(input) && vscode) {
            vscode.postMessage({ type: 'pick-file', content: input });
            // Wait for file-attachment response
            return;
        }
        setMessages((msgs) => [
            ...msgs,
            { id: msgs.length + 1, role: 'user', content: input }
        ]);
        if (vscode) {
            vscode.postMessage({ type: 'user-message', content: input });
            setLoading(true);
        }
        setInput('');
    };
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };
    return (<div className="chat-container">
      <div className="chat-history">
        {messages.map(msg => (<div key={msg.id} className={`chat-message ${msg.role}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
            {msg.attachment && (<div className="attachment">
                <strong>Attachment:</strong> {msg.attachment.name} ({msg.attachment.type})
                {msg.attachment.type.startsWith('image/') ? (<img src={`data:${msg.attachment.type};base64,${msg.attachment.content}`} alt={msg.attachment.name} style={{ maxWidth: 200, display: 'block', marginTop: 8 }}/>) : (<pre style={{ maxHeight: 200, overflow: 'auto', background: '#f6f8fa', marginTop: 8 }}>{atob(msg.attachment.content).slice(0, 500)}</pre>)}
              </div>)}
          </div>))}
        {loading && (<div className="chat-message ai"><em>AI is typing…</em></div>)}
        <div ref={messagesEndRef}/>
      </div>
      <div className="chat-input-row">
        <input type="text" value={input} onChange={handleInputChange} placeholder="Type a message... (@filename to attach)" onKeyDown={e => { if (e.key === 'Enter')
        sendMessage(); }}/>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>);
}
export default App;
//# sourceMappingURL=App.js.map