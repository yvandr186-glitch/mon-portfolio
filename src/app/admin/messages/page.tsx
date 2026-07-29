"use client";

import * as React from "react";
import { Send, Archive } from "lucide-react";
import { contactMessages } from "@/lib/data";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function AdminMessagesPage() {
  const { toast } = useToast();
  const [selected, setSelected] = React.useState(contactMessages[0]);
  const [reply, setReply] = React.useState("");

  const sendReply = () => {
    if (!reply.trim()) return;
    toast({ title: "Réponse envoyée", description: `Votre réponse a été envoyée à ${selected.email}.` });
    setReply("");
  };

  return (
    <>
      <AdminPageHeader
        title="Messages"
        description="Lisez et répondez aux messages reçus via le formulaire de contact."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-2">
          {contactMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => setSelected(msg)}
              className={cn(
                "cursor-pointer rounded-2xl border p-4 transition-colors",
                selected.id === msg.id ? "border-pink bg-pink-soft" : "border-border bg-card hover:border-foreground/30"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-foreground">{msg.name}</p>
                <span className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-widest",
                  msg.status === "new" && "bg-pink text-white",
                  msg.status === "read" && "border border-border text-muted-foreground",
                  msg.status === "replied" && "border border-pink-soft text-pink",
                  msg.status === "archived" && "text-muted-foreground/60"
                )}>
                  {msg.status === "new" ? "nouveau" : msg.status === "read" ? "lu" : msg.status === "replied" ? "répondu" : "archivé"}
                </span>
              </div>
              <p className="mt-1 truncate text-xs text-muted-foreground">{msg.subject}</p>
              <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{msg.message}</p>
              <p className="mt-2 text-[10px] text-muted-foreground">{msg.receivedAt}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">De</p>
              <p className="text-sm font-semibold text-foreground">{selected.name}</p>
              <p className="text-xs text-muted-foreground">{selected.email}</p>
            </div>
            <span className="rounded-full bg-pink px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
              {selected.status === "new" ? "nouveau" : selected.status === "read" ? "lu" : "répondu"}
            </span>
          </div>
          <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{selected.subject}</h3>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/90">{selected.message}</p>

          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Répondre</p>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={5}
              placeholder="Tapez votre réponse..."
              className="mt-2 w-full resize-none rounded-xl border border-border bg-background p-3 text-sm focus-premium"
            />
            <div className="mt-3 flex justify-end gap-2">
              <button className="flex h-9 items-center gap-2 rounded-full border border-border px-4 text-xs font-medium hover:bg-accent">
                <Archive className="h-3 w-3" />
                Archiver
              </button>
              <button
                onClick={sendReply}
                className="flex h-9 items-center gap-2 rounded-full bg-pink px-4 text-xs font-semibold text-white hover:opacity-90"
              >
                <Send className="h-3 w-3" />
                Envoyer la réponse
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
