import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

export default function AICopilotChat() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello DPO. How can I assist you with compliance intelligence today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    
    // Simulate AI response based on PRD use case
    setTimeout(() => {
      let reply = "I'm analyzing the global registries...";
      
      if (newMsg.text.toLowerCase().includes('aadhaar')) {
        reply = "I found 3 active data sources holding Aadhaar numbers without explicit consent. AWS RDS (PostgreSQL) has 1,200 records missing valid consent logs. I can draft an alert to the DevOps team or automatically block sync. How would you like to proceed?";
      }
      
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: reply }]);
    }, 1500);
  };

  return (
    <div className="glass-panel col-span-6">
      <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="#a855f7" /> AI DPO Copilot
        </div>
        <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#d8b4fe' }}>NLQ Active</span>
      </div>
      
      <div className="chat-window">
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>
        
        <div className="chat-input">
          <input 
            type="text" 
            placeholder="e.g., Show me all active data sources holding Aadhaar numbers..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}><Send size={16} /></button>
        </div>
      </div>
    </div>
  );
}
