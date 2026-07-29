"use client";

import { motion } from "framer-motion";
import {
  FileText, FolderGit2, Users, MailOpen, MessageSquare, MessageCircle,
  TrendingUp, ArrowUpRight, ArrowDownRight, Download, Eye, Heart, Clock,
} from "lucide-react";
import {
  articles, adminUsers, newsletterSubscribers, contactMessages,
  categories,
} from "@/lib/data";
import { useProjects } from "@/hooks/use-projects";
import { useComments } from "@/hooks/use-comments";
import { useLikes } from "@/hooks/use-likes";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AdminDashboardPage() {
  const { items: projectList } = useProjects();
  const { allComments, pendingCount } = useComments();
  const { totalLikes } = useLikes();

  const cards = [
    { label: "Articles", value: articles.length, change: "+2", trend: "up", icon: FileText },
    { label: "Projets", value: projectList.length, change: "+1", trend: "up", icon: FolderGit2 },
    { label: "Commentaires", value: allComments.length, sub: `${pendingCount} en attente`, trend: "up", icon: MessageCircle },
    { label: "Likes", value: totalLikes, change: "tous articles", trend: "up", icon: Heart },
    { label: "Abonnés", value: newsletterSubscribers.length, change: "+3", trend: "up", icon: MailOpen },
    { label: "Messages", value: contactMessages.length, change: `${contactMessages.filter(m => m.status === "new").length} nouveaux`, trend: "up", icon: MessageSquare },
  ];

  const chartData = [42, 58, 49, 71, 64, 88, 92, 76, 84, 98, 91, 105];

  return (
    <div>
      <AdminPageHeader
        title="Tableau de bord"
        description="Vue d'ensemble de votre portfolio — données en temps réel."
      />

      <div className="space-y-6">
        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background",
                  card.icon === Heart && "bg-pink-soft border-pink-soft"
                )}>
                  <card.icon className={cn("h-4 w-4", card.icon === Heart && "text-pink")} />
                </div>
                {card.change && (
                  <span className={cn(
                    "flex items-center gap-0.5 text-xs font-medium",
                    card.trend === "up" ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {card.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {card.change}
                  </span>
                )}
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">{card.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.label}</p>
              {card.sub && (
                <p className="mt-0.5 flex items-center gap-1 text-[10px] text-pink">
                  <Clock className="h-2.5 w-2.5" />
                  {card.sub}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Trafic du site</h3>
                <p className="text-xs text-muted-foreground">12 dernières semaines</p>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                <Download className="h-3 w-3" /> Exporter
              </button>
            </div>
            <div className="mt-6 h-48">
              <MiniBarChart data={chartData} />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground">Articles par catégorie</h3>
            <div className="mt-4 space-y-3">
              {categories.map((cat) => {
                const max = Math.max(...categories.map((c) => c.articleCount));
                return (
                  <div key={cat.id}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">{cat.name}</span>
                      <span className="text-muted-foreground">{cat.articleCount}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-border">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(cat.articleCount / max) * 100}%` }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="h-full rounded-full bg-pink"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent comments + recent articles */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Recent comments from visitors */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Derniers commentaires</h3>
              <a href="/admin/comments" className="text-[10px] text-pink hover:underline">
                Tout voir
              </a>
            </div>
            <div className="mt-4 space-y-3">
              {allComments.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-6 text-center">
                  <MessageCircle className="mx-auto h-6 w-6 text-muted-foreground/40" />
                  <p className="mt-2 text-xs text-muted-foreground">Aucun commentaire pour le moment</p>
                </div>
              ) : (
                allComments.slice(0, 4).map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3 rounded-xl border border-border bg-background p-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border">
                      <span className="text-xs font-bold text-foreground">
                        {comment.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-xs font-medium text-foreground">{comment.author}</p>
                        <span className={cn(
                          "flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-medium",
                          comment.status === "approved" && "bg-pink-soft text-pink",
                          comment.status === "pending" && "bg-accent text-foreground",
                          comment.status === "spam" && "bg-muted text-muted-foreground"
                        )}>
                          {comment.status === "approved" ? "Approuvé" : comment.status === "pending" ? "En attente" : "Spam"}
                        </span>
                      </div>
                      <p className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">{comment.content}</p>
                      <p className="mt-0.5 text-[9px] text-muted-foreground">{comment.articleTitle}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent articles */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground">Articles récents</h3>
            <div className="mt-4 space-y-3">
              {articles.slice(0, 4).map((article) => (
                <div key={article.id} className="flex items-center gap-4 rounded-xl border border-border bg-background p-3">
                  <img src={article.cover} alt="" className="h-12 w-16 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{article.title}</p>
                    <div className="mt-0.5 flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-2.5 w-2.5" />
                        {article.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-2.5 w-2.5" />
                        {allComments.filter((c) => c.articleId === article.id).length}
                      </span>
                      <span>{article.readingTime} min</span>
                    </div>
                  </div>
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {article.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniBarChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-full items-end justify-between gap-1.5">
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          className="group relative flex-1 rounded-t bg-pink/20 transition-colors hover:bg-pink"
        >
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-foreground px-1.5 py-0.5 text-[9px] font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
            {v}k
          </div>
        </motion.div>
      ))}
    </div>
  );
}
