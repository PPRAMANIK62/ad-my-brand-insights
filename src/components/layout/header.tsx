"use client";

import { motion } from "framer-motion";
import { Bell, Menu, Search, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

type HeaderProps = {
  onMenuClick?: () => void;
  sidebarCollapsed?: boolean;
  className?: string;
};

export function Header({ onMenuClick, sidebarCollapsed = false, className }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Show brand when sidebar is collapsed on desktop */}
          {sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="hidden md:flex items-center space-x-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                AD
              </div>
              <div>
                <h1 className="text-lg font-semibold">ADmyBRAND</h1>
                <p className="text-xs text-muted-foreground">Insights</p>
              </div>
            </motion.div>
          )}

          {/* Original brand section - only show on mobile, hide on desktop */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="md:hidden flex items-center space-x-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              AD
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold">ADmyBRAND</h1>
              <p className="text-xs text-muted-foreground">Insights</p>
            </div>
          </motion.div>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search campaigns, metrics..."
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm font-medium">Campaign Alert</p>
                  <p className="text-xs text-muted-foreground">2m ago</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Summer Sale campaign performance is below target
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm font-medium">Budget Warning</p>
                  <p className="text-xs text-muted-foreground">1h ago</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Google Ads budget is 90% depleted
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm font-medium">New Conversion</p>
                  <p className="text-xs text-muted-foreground">3h ago</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  High-value conversion from LinkedIn campaign
                </p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}

// Breadcrumb component for navigation
type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center"
        >
          {index > 0 && <span className="mx-2">/</span>}
          {item.href
            ? (
                <a
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              )
            : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}
        </motion.div>
      ))}
    </nav>
  );
}

// Page header with title and actions
type PageHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex flex-col space-y-4 pb-6", className)}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {children && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-2"
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
