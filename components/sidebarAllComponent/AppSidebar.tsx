"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "../ui/sidebar";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { adminSidebarSections, userSidebarSections } from "./sidebar-data";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

interface AppSidebarProps {
  userRole: string;
}

const AppSidebar = ({ userRole }: AppSidebarProps) => {
  const { toggleSidebar, state } = useSidebar(); 
  const pathname = usePathname();
  const sidebarData =
    userRole === "admin" ? adminSidebarSections : userSidebarSections;

  return (
    <Sidebar collapsible="icon">
      {/* Sidebar Header */}
      <SidebarHeader className="h-16 flex items-center justify-center border-b relative">
        {state === "expanded" ? (
          <Image
            src="/logo.png"
            alt="Logo"
            width={130}
            height={32}
            priority
            className="object-contain"
          />
        ) : (
          <Image
            src="/logoIcon.png"
            alt="Logo Icon"
            width={32}
            height={32}
            priority
            className="object-contain"
          />
        )}

        <button
          onClick={toggleSidebar}
          className="absolute hidden md:block -right-3 top-1/2 -translate-y-1/2 bg-background text-primary rounded-full p-1 border shadow-md hover:scale-110 transition-transform z-20"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              state === "collapsed" && "rotate-180"
            )}
          />
        </button>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="px-2 no-scrollbar">
        {sidebarData.map((section) => (
          <SidebarGroup key={section.label || "default"}>
            {section.label && (
              <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            )}
            
            <SidebarMenu>
              {section.items.map((item) => {
                const hasSubMenu = item.items && item.items.length > 0;

                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);

                const isChildActive = hasSubMenu
                  ? item.items?.some((sub) => pathname === sub.url)
                  : false;

                if (hasSubMenu) {
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={isChildActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className="flex items-center gap-3 px-3 py-5"
                          >
                            <item.icon className="size-4 shrink-0" />
                            <span className="text-base tracking-wide flex-1">
                              {item.title}
                            </span>
                            <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => {
                              const isSubItemActive = pathname === subItem.url;

                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={isSubItemActive}
                                  >
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                // Standard Menu Item
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className="flex items-center gap-3 px-3 py-5 transition-all"
                    >
                      <Link href={item.url}>
                        <item.icon className="size-4 shrink-0" />
                        <span className="text-base tracking-wide">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="p-4 border-t">
        <div
          className={cn(
            "flex items-center gap-2 text-xs text-muted-foreground",
            state === "collapsed" && "justify-center"
          )}
        >
          <span className="font-mono bg-muted px-1 py-0.5 rounded">
            v8.1.10
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;