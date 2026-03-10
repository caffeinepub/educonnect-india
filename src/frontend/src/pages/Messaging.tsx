import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { MessageCircle, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { MOCK_CONVERSATIONS } from "../data/mockData";
import { useActor } from "../hooks/useActor";

export default function Messaging() {
  const { actor } = useActor();
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [activeId, setActiveId] = useState(MOCK_CONVERSATIONS[0].id);
  const [newMessage, setNewMessage] = useState("");

  const active = conversations.find((c) => c.id === activeId);

  const sendMutation = useMutation({
    mutationFn: async (text: string) => {
      if (actor) {
        await actor.sendMessage(
          "student-me",
          active?.participantId || "",
          text,
        );
      }
    },
    onSuccess: (_, text) => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? {
                ...c,
                lastMessage: text,
                messages: [
                  ...c.messages,
                  { id: `m${Date.now()}`, senderId: "me", text, time: "Now" },
                ],
              }
            : c,
        ),
      );
      setNewMessage("");
    },
    onError: () => toast.error("Failed to send message"),
  });

  const handleSend = () => {
    if (!newMessage.trim()) return;
    sendMutation.mutate(newMessage);
  };

  return (
    <main className="container mx-auto px-4 py-8" data-ocid="messaging.page">
      <h1 className="font-display text-2xl font-bold mb-6">Messages</h1>
      <div
        className="border border-border rounded-2xl overflow-hidden flex"
        style={{ height: "600px" }}
      >
        {/* Conversation List */}
        <div className="w-80 border-r border-border flex-shrink-0 flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
              Conversations
            </h2>
          </div>
          <ScrollArea className="flex-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                className={`w-full p-4 flex items-start gap-3 hover:bg-accent/50 transition-colors text-left border-b border-border/50 ${
                  activeId === conv.id ? "bg-accent" : ""
                }`}
                onClick={() => {
                  setActiveId(conv.id);
                  setConversations((prev) =>
                    prev.map((c) =>
                      c.id === conv.id ? { ...c, unread: 0 } : c,
                    ),
                  );
                }}
                data-ocid="messaging.button"
              >
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="gradient-teal text-white font-semibold text-sm">
                    {conv.participantName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm truncate">
                      {conv.participantName}
                    </span>
                    <span className="text-[10px] text-muted-foreground shrink-0 ml-1">
                      {conv.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <Badge className="h-5 w-5 p-0 flex items-center justify-center gradient-teal text-white border-0 text-[10px] shrink-0">
                    {conv.unread}
                  </Badge>
                )}
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col min-w-0">
          {active ? (
            <>
              <div className="p-4 border-b flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="gradient-teal text-white font-semibold text-sm">
                    {active.participantName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm">
                    {active.participantName}
                  </div>
                  <div className="text-xs text-green-500">Online</div>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {active.messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-2.5 text-sm ${
                          msg.senderId === "me"
                            ? "gradient-teal text-white rounded-br-sm"
                            : "bg-accent text-foreground rounded-bl-sm"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p
                          className={`text-[10px] mt-1 ${msg.senderId === "me" ? "text-white/70" : "text-muted-foreground"}`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  data-ocid="messaging.input"
                />
                <Button
                  className="gradient-teal text-white border-0 hover:opacity-90 shrink-0"
                  onClick={handleSend}
                  disabled={!newMessage.trim() || sendMutation.isPending}
                  data-ocid="messaging.primary_button"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div
              className="flex-1 flex items-center justify-center"
              data-ocid="messaging.empty_state"
            >
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Select a conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
