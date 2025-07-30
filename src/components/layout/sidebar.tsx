"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  Home,
  Settings,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  id: string;
  label: string;
  icon: any;
  href: string;
  badge?: string | number;
  active?: boolean;
};

type SidebarProps = {
  isOpen?: boolean;
  onToggle?: () => void;
  collapsed?: boolean;
  onCollapse?: () => void;
  className?: string;
};

const navigationItems: NavItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: Home,
    href: "/",
    active: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    id: "campaigns",
    label: "Campaigns",
    icon: Target,
    href: "/campaigns",
    badge: "12",
  },
  {
    id: "audience",
    label: "Audience",
    icon: Users,
    href: "/audience",
  },
  {
    id: "performance",
    label: "Performance",
    icon: TrendingUp,
    href: "/performance",
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
    href: "/reports",
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
];

const bottomItems: NavItem[] = [
  {
    id: "automation",
    label: "Automation",
    icon: Zap,
    href: "/automation",
    badge: "New",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: HelpCircle,
    href: "/help",
  },
];

export function Sidebar({
  isOpen = true,
  collapsed = false,
  onCollapse,
  className,
}: SidebarProps) {
  const handleCollapse = () => {
    onCollapse?.();
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{
        x: 0, // Always show on desktop, mobile overlay handles hiding
        width: collapsed ? 80 : 280,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "hidden md:flex fixed left-0 top-0 z-40 h-full bg-card border-r border-border",
        "md:relative md:translate-x-0",
        isOpen && "flex md:flex", // Show on mobile when isOpen is true
        className,
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                  AD
                </div>
                <div>
                  <h2 className="text-sm font-semibold">ADmyBRAND</h2>
                  <p className="text-xs text-muted-foreground">Insights</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleCollapse}
            className="h-8 w-8"
          >
            {collapsed
              ? (
                  <ChevronRight className="h-4 w-4" />
                )
              : (
                  <ChevronLeft className="h-4 w-4" />
                )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          <div className="space-y-1">
            {navigationItems.map((item, index) => (
              <NavItem
                key={item.id}
                item={item}
                collapsed={collapsed}
                index={index}
              />
            ))}
          </div>

          <div className="pt-4 border-t">
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Tools
                </motion.p>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              {bottomItems.map((item, index) => (
                <NavItem
                  key={item.id}
                  item={item}
                  collapsed={collapsed}
                  index={index + navigationItems.length}
                />
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="rounded-lg bg-muted p-3"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium">Live Data</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Real-time analytics updating every 30 seconds
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}

// Navigation item component
type NavItemProps = {
  item: NavItem;
  collapsed: boolean;
  index: number;
};

function NavItem({ item, collapsed, index }: NavItemProps) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Button
        variant={item.active ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start h-10",
          collapsed ? "px-2" : "px-3",
          item.active && "bg-primary/10 text-primary hover:bg-primary/20",
        )}
        asChild
      >
        <a href={item.href}>
          <Icon className={cn("h-4 w-4", collapsed ? "mx-auto" : "mr-3")} />

          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 text-left"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>

          {item.badge && !collapsed && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Badge
                variant={item.badge === "New" ? "default" : "secondary"}
                className="ml-auto text-xs"
              >
                {item.badge}
              </Badge>
            </motion.div>
          )}
        </a>
      </Button>
    </motion.div>
  );
}

// Mobile overlay
export function SidebarOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}
    </AnimatePresence>
  );
}
