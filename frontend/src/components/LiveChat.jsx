import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const GREETING = "Hi 👋 I'm your PureBreeze assistant. Ask me about services, pricing or availability — or call 0490 507 878.";

function uid() { return Math.random().toString(36).slice(2, 10); }

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([
    { id: uid(), role: "assistant", text: GREETING },
  ]);
  const [convoId, setConvoId] = useState("");
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = async (e) => {
    e?.preventDefault();
    const msg = text.trim();
    if (!msg || sending) return;
    setMessages((prev) => [...prev, { id: uid(), role: "user", text: msg }]);
    setText("");
    setSending(true);
    try {
      const { data } = await axios.post(`${API}/chat/message`, {
        conversation_id: convoId || "",
        message: msg,
      });
      setConvoId(data.conversation_id);
      setMessages((prev) => [...prev, { id: uid(), role: "assistant", text: data.assistant_message }]);
    } catch {
      setMessages((prev) => [...prev, { id: uid(), role: "assistant",
        text: "I'm offline for a moment — please call 0490 507 878 or we'll reply soon." }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Launcher bubble */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open live chat"
        data-testid="live-chat-toggle"
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_12px_30px_rgba(14,165,233,0.4)] transition-all ${
          open ? "bg-slate-900 hover:bg-slate-800" : "bg-gradient-to-br from-sky-500 to-cyan-500 hover:scale-105"
        }`}
      >
        {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
      </button>

      {/* Chat panel */}
      <div
        data-testid="live-chat-panel"
        className={`fixed bottom-24 right-6 z-40 w-[92vw] max-w-[380px] transition-all duration-300 origin-bottom-right ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className="rounded-3xl bg-white border border-sky-100 shadow-[0_30px_70px_-20px_rgba(15,23,42,0.3)] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-sky-500 to-cyan-500 px-5 py-4 text-white">
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
              </div>
              <div className="leading-tight">
                <div className="font-display font-bold text-base tracking-tight">PureBreeze Assistant</div>
                <div className="text-[11px] text-sky-100">Online · replies in seconds</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollerRef}
            className="h-[360px] overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-white to-sky-50/50"
          >
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${
                    m.role === "user"
                      ? "bg-sky-500 text-white rounded-br-md"
                      : "bg-white border border-slate-200 text-slate-800 rounded-bl-md"
                  }`}
                  data-testid={`chat-msg-${m.role}`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-3.5 py-2 text-sm text-slate-500">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "120ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "240ms" }} />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={send} className="border-t border-slate-100 p-3 flex gap-2 bg-white">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message…"
              className="rounded-full"
              data-testid="chat-input"
            />
            <Button
              type="submit"
              disabled={!text.trim() || sending}
              className="rounded-full bg-sky-500 hover:bg-sky-600 w-10 h-10 p-0 flex items-center justify-center"
              data-testid="chat-send"
            >
              <Send size={16} />
            </Button>
          </form>
          <div className="px-4 pb-3 text-[10px] text-slate-400 text-center">
            Powered by PureBreeze AI · wingman-ready
          </div>
        </div>
      </div>
    </>
  );
}
