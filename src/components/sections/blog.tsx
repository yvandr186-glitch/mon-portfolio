"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, Eye, Tag, X, Share2, Twitter, Linkedin, Link2, Heart, MessageCircle, Send, Loader2, CheckCircle2 } from "lucide-react";
import { articles } from "@/lib/data";
import type { Article, ArticleBlock } from "@/lib/types";
import { SectionHeader } from "./skills";
import {
  Dialog, DialogContent, DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useComments } from "@/hooks/use-comments";
import { useLikes } from "@/hooks/use-likes";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Blog() {
  const [selected, setSelected] = React.useState<Article | null>(null);

  const featured = articles.find((a) => a.featured) ?? articles[0];
  const recent = articles.filter((a) => a.id !== featured.id).slice(0, 3);

  return (
    <section id="blog" className="relative border-t border-border bg-background py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Écrits"
            title="Notes sur le métier."
            description="Articles long-format sur l'architecture, la performance, les design systems et les décisions d'ingénierie qui façonnent les produits."
          />
          <a
            href="#blog"
            className="inline-flex h-11 items-center gap-2 self-start rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent lg:self-end"
          >
            Voir tous les articles
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Featured article */}
          <motion.button
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            onClick={() => setSelected(featured)}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card text-left card-hover hover:border-foreground/30"
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
              { }
              <img
                src={featured.cover}
                alt={featured.title}
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <span className="absolute left-4 top-4 rounded-full bg-pink px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white shadow-pink-glow">
                À la une
              </span>
            </div>
            <div className="flex flex-1 flex-col p-7">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{featured.category}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {featured.readingTime} min de lecture
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {(featured.views / 1000).toFixed(1)}k
                </span>
              </div>
              <h3 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <div className="flex items-center gap-3">
                  { }
                  <img
                    src={featured.author.avatar}
                    alt={featured.author.name}
                    className="h-8 w-8 rounded-full object-cover grayscale"
                  />
                  <div>
                    <p className="text-xs font-medium text-foreground">{featured.author.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {new Date(featured.publishedAt).toLocaleDateString("fr-FR", {
                        month: "long", day: "numeric", year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </div>
            </div>
          </motion.button>

          {/* Recent list */}
          <div className="grid gap-4">
            {recent.map((article, i) => (
              <motion.button
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                onClick={() => setSelected(article)}
                className="group relative flex gap-5 overflow-hidden rounded-3xl border border-border bg-card p-5 text-left card-hover hover:border-foreground/30"
              >
                <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl border border-border sm:w-32">
                  { }
                  <img
                    src={article.cover}
                    alt={article.title}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="font-medium text-foreground">{article.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readingTime}m
                    </span>
                  </div>
                  <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug tracking-tight text-foreground">
                    {article.title}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                    {article.excerpt}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Article reader */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto border-border bg-background p-0">
          <DialogTitle className="sr-only">
            {selected?.title ?? "Article reader"}
          </DialogTitle>
          {selected && <ArticleReader article={selected} />}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function ArticleReader({ article }: { article: Article }) {
  return (
    <article className="relative">
      {/* Cover */}
      <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-border">
        { }
        <img
          src={article.cover}
          alt={article.title}
          className="h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      {/* Header */}
      <header className="px-6 pt-8 sm:px-10 sm:pt-10">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full border border-border bg-card px-3 py-1 font-medium text-foreground">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readingTime} min de lecture
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {article.views.toLocaleString()} vues
          </span>
          <span>·</span>
          <span>
            {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
              month: "long", day: "numeric", year: "numeric",
            })}
          </span>
        </div>

        <h1 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between border-y border-border py-4">
          <div className="flex items-center gap-3">
            { }
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="h-10 w-10 rounded-full object-cover grayscale"
            />
            <div>
              <p className="text-sm font-medium text-foreground">{article.author.name}</p>
              <p className="text-xs text-muted-foreground">{article.author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Partager sur Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <Twitter className="h-3.5 w-3.5" />
            </button>
            <button
              aria-label="Partager sur LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </button>
            <button
              aria-label="Copier le lien"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <Link2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <ArticleBody blocks={article.content} />
      </div>

      {/* Tags */}
      <footer className="border-t border-border px-6 py-6 sm:px-10">
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="h-3.5 w-3.5 text-muted-foreground" />
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </footer>

      {/* Likes + Comments */}
      <LikesAndComments article={article} />
    </article>
  );
}

/* ============= LIKES + COMMENTS SECTION ============= */
function LikesAndComments({ article }: { article: Article }) {
  const { articleLikes, hasLiked, toggleLike } = useLikes(article.id);
  const { articleComments, addComment, loaded } = useComments(article.id);

  return (
    <section className="border-t border-border px-6 py-8 sm:px-10">
      {/* Like button */}
      <div className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-card p-5">
        <button
          onClick={() => toggleLike(article.id)}
          className={cn(
            "group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all",
            hasLiked
              ? "bg-pink text-white shadow-pink-glow"
              : "border border-border bg-background text-foreground hover:border-pink-soft"
          )}
        >
          <motion.span
            animate={hasLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart className={cn("h-5 w-5", hasLiked && "fill-current")} />
          </motion.span>
          {hasLiked ? "J'aime" : "Aimer"}
          <span className="ml-1 rounded-full bg-background/20 px-2 py-0.5 text-xs">
            {articleLikes}
          </span>
        </button>
      </div>

      {/* Comments */}
      <div className="mt-8">
        <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
          <MessageCircle className="h-5 w-5" />
          Commentaires
          <span className="text-sm font-normal text-muted-foreground">
            ({articleComments.length})
          </span>
        </h3>

        {/* Comment form */}
        <CommentForm
          articleId={article.id}
          articleTitle={article.title}
          onSubmit={addComment}
        />

        {/* Comments list */}
        {loaded && articleComments.length > 0 ? (
          <div className="mt-6 space-y-4">
            {articleComments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                    <span className="text-sm font-bold text-foreground">
                      {comment.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{comment.author}</p>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          loaded && (
            <div className="mt-6 rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
              <MessageCircle className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="mt-3 text-sm text-muted-foreground">
                Aucun commentaire pour le moment. Soyez le premier à réagir !
              </p>
            </div>
          )
        )}

        {!loaded && (
          <div className="mt-6 flex items-center justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* Info modération */}
        <p className="mt-4 text-center text-[10px] text-muted-foreground">
          Les commentaires sont modérés avant d'être publiés.
        </p>
      </div>
    </section>
  );
}

/* ============= COMMENT FORM ============= */
function CommentForm({
  articleId,
  articleTitle,
  onSubmit,
}: {
  articleId: string;
  articleTitle: string;
  onSubmit: (data: { articleId: string; articleTitle: string; author: string; email: string; content: string }) => void;
}) {
  const [author, setAuthor] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (author.trim().length < 2) {
      setError("Le nom doit faire au moins 2 caractères");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Entrez un email valide");
      return;
    }
    if (content.trim().length < 5) {
      setError("Le commentaire doit faire au moins 5 caractères");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    onSubmit({ articleId, articleTitle, author: author.trim(), email: email.trim(), content: content.trim() });
    setLoading(false);
    setSent(true);
    setAuthor("");
    setEmail("");
    setContent("");
    setTimeout(() => setSent(false), 4000);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-4 flex items-center gap-3 rounded-2xl border border-pink-soft bg-pink-soft/40 p-5"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink text-white">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Commentaire envoyé !</p>
          <p className="text-xs text-muted-foreground">
            Il sera visible après validation par l'administrateur.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Votre nom *"
          className="h-11 rounded-xl border border-border bg-card px-4 text-sm focus-premium"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email *"
          className="h-11 rounded-xl border border-border bg-card px-4 text-sm focus-premium"
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="Partagez votre avis... *"
        className="w-full resize-none rounded-xl border border-border bg-card p-4 text-sm focus-premium"
      />
      {error && <p className="text-xs text-foreground">{error}</p>}
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-muted-foreground">* Champs obligatoires</p>
        <button
          type="submit"
          disabled={loading}
          className="group flex h-11 items-center gap-2 rounded-full bg-pink px-5 text-sm font-semibold text-white shadow-pink-glow transition-all hover:gap-3 disabled:opacity-50"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Envoi…</>
          ) : (
            <>Publier <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>
          )}
        </button>
      </div>
    </form>
  );
}

function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading": {
            const Tag = (block.level === 1 ? "h1" : block.level === 2 ? "h2" : "h3") as React.ElementType;
            const size =
              block.level === 1
                ? "text-3xl font-semibold mt-10 mb-3"
                : block.level === 2
                ? "text-2xl font-semibold mt-8 mb-3"
                : "text-xl font-semibold mt-6 mb-2";
            return (
              <Tag key={i} className={cn("tracking-tight text-foreground", size)}>
                {block.text}
              </Tag>
            );
          }
          case "paragraph":
            return (
              <p key={i} className="text-pretty text-[15px] leading-[1.75] text-foreground/90">
                {block.text}
              </p>
            );
          case "code":
            return (
              <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-4 py-2">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    {block.language}
                  </span>
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-foreground/20" />
                    <span className="h-2 w-2 rounded-full bg-foreground/20" />
                    <span className="h-2 w-2 rounded-full bg-foreground/20" />
                  </div>
                </div>
                <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-foreground/90">
                  <code className="font-mono">{block.code}</code>
                </pre>
              </div>
            );
          case "quote":
            return (
              <blockquote key={i} className="border-l-2 border-foreground pl-5 py-1">
                <p className="text-pretty text-lg font-medium italic leading-relaxed text-foreground">
                  "{block.text}"
                </p>
                {block.cite && (
                  <cite className="mt-2 block text-xs text-muted-foreground">
                    — {block.cite}
                  </cite>
                )}
              </blockquote>
            );
          case "list":
            return block.ordered ? (
              <ol key={i} className="list-inside list-decimal space-y-2 text-[15px] leading-[1.7] text-foreground/90 marker:text-muted-foreground">
                {block.items.map((item, j) => <li key={j}>{item}</li>)}
              </ol>
            ) : (
              <ul key={i} className="space-y-2 text-[15px] leading-[1.7] text-foreground/90">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <div
                key={i}
                className={cn(
                  "rounded-2xl border px-5 py-4 text-sm leading-relaxed",
                  block.variant === "warning" && "border-foreground/30 bg-card text-foreground",
                  block.variant === "info" && "border-border bg-card text-foreground/90",
                  block.variant === "success" && "border-foreground/20 bg-card text-foreground/90"
                )}
              >
                <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {block.variant}
                </p>
                {block.text}
              </div>
            );
          case "divider":
            return <hr key={i} className="my-8 border-0 h-px bg-border" />;
          default:
            return null;
        }
      })}
    </div>
  );
}
