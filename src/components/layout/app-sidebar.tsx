'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Bot,
  ChefHat,
  HeartPulse,
  Flower2,
  BookHeart,
} from 'lucide-react';
import { Button } from '../ui/button';

export function AppSidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: BookHeart, label: 'Journal', href: '/' },
    { icon: Bot, label: 'AI Companion', href: '/' },
    { icon: ChefHat, label: 'Recipes', href: '/' },
    { icon: Flower2, label: 'Self-Care', href: '/' },
    { icon: HeartPulse, label: 'Fitness', href: '/' },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 text-primary"
          >
            <path d="M12 2a10 10 0 0 0-10 10c0 5 4.5 9.4 10 9.4s10-4.4 10-9.4A10 10 0 0 0 12 2z" />
            <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" />
            <path d="M12 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
          </svg>
          <span className="font-headline text-lg font-semibold">
            Hormone Harmony
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                tooltip={item.label}
                isActive={item.label === 'Dashboard'}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost">Sign Out</Button>
      </SidebarFooter>
    </Sidebar>
  );
}

const SidebarContent = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col flex-1 min-h-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden">
    {children}
  </div>
);
