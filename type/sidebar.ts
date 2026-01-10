import type { LucideIcon } from "lucide-react";

export interface SubSidebarItem {
  title: string;
  url: string;
}

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: SubSidebarItem[]; 
}

export interface SidebarSection {
  label?: string;
  items: SidebarItem[];
}