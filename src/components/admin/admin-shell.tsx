"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, FolderGit2, Users, MailOpen, Image as ImageIcon,
  Settings, MessageSquare, Plus, Bell, Shield, FolderTree, Tag as TagIcon,
  MessageCircle, ArrowLeft, LogOut, Search,
} from "lucide-react";
import {
  articles, projects, adminUsers, newsletterSubscribers, contactMessages,
  categories, tags, comments,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/data";
import { useSession, signOut } from "@/lib/auth-client";
import { useComments } from "@/hooks/use-comments";

export interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

export const navItems: NavItem[] = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/articles", label: "Articles", icon: FileText, badge: articles.length },
  { href: "/admin/projects", label: "Projets", icon: FolderGit2, badge: projects.length },
  { href: "/admin/categories", label: "Catégories", icon: FolderTree, badge: categories.length },
  { href: "/admin/tags", label: "Tags", icon: TagIcon, badge: tags.length },
  { href: "/admin/media", label: "Médias", icon: ImageIcon },
  { href: "/admin/comments", label: "Commentaires", icon: MessageCircle, badge: comments.filter(c => c.status === "pending").length },
  { href: "/admin/newsletter", label: "Newsletter", icon: MailOpen, badge: newsletterSubscribers.length },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare, badge: contactMessages.filter(m => m.status === "new").length },
  { href: "/admin/users", label: "Utilisateurs", icon: Users, badge: adminUsers.length },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const { pendingCount } = useComments();

  // Calculer les badges dynamiquement
  const badges: Record<string, number> = {
    "/admin/comments": pendingCount,
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-border bg-card/30 lg:flex">
        {/* Brand */}
        <div className="flex items-center gap-2.5 border-b border-border px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-pink">
            <img src={profile.logo} alt={profile.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold tracking-tight text-foreground">Console Admin</p>
            <p className="truncate text-[10px] text-muted-foreground">{profile.name}</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-pink text-white"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {(() => {
                  const dynamicBadge = badges[item.href];
                  const badgeValue = dynamicBadge !== undefined ? dynamicBadge : item.badge;
                  if (badgeValue === undefined || badgeValue === 0) return null;
                  return (
                    <span className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                      isActive ? "bg-white/20 text-white" : "bg-accent text-foreground"
                    )}>
                      {badgeValue}
                    </span>
                  );
                })()}
              </Link>
            );
          })}
        </nav>

        {/* User card */}
        <div className="border-t border-border p-3 space-y-2">
          <div className="rounded-xl border border-border bg-background p-3">
            <div className="flex items-center gap-2">
              <img
                src={profile.logo}
                alt={user?.name || profile.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">{user?.name || profile.name}</p>
                <p className="truncate text-[10px] text-muted-foreground">{user?.email || profile.email}</p>
              </div>
              <span className="rounded-full bg-pink px-1.5 py-0.5 text-[9px] font-bold text-white">ADMIN</span>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour au site
          </Link>
          <button
            onClick={async () => {
              await signOut();
              window.location.href = "/login";
            }}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/80 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            {/* Mobile brand */}
            <div className="flex items-center gap-2 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-pink">
                <img src={profile.logo} alt="" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Rechercher..."
                className="h-9 w-64 rounded-full border border-border bg-card pl-9 pr-4 text-sm focus-premium"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-pink" />
            </button>
            <Link
              href="/"
              className="flex h-9 items-center gap-2 rounded-full border border-border px-4 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Voir le site</span>
            </Link>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="border-b border-border lg:hidden">
          <div className="flex gap-1 overflow-x-auto p-3">
            {navItems.map((item) => {
              const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-colors",
                    isActive ? "bg-pink text-white" : "bg-card text-muted-foreground"
                  )}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function AdminPrimaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-10 items-center gap-2 rounded-full bg-pink px-5 text-sm font-semibold text-white shadow-pink-glow hover:opacity-90"
    >
      {children}
    </button>
  );
}
