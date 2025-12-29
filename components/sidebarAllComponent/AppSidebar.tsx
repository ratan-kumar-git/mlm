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
  useSidebar,
} from "../ui/sidebar";
import { sidebarSections } from "./sidebar-data";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const AppSidebar = () => {
  const { open, toggleSidebar, state } = useSidebar();
  return (
    <>
      <Sidebar collapsible="icon">
        {/* sidebar header */}
        <SidebarHeader className="h-16 flex items-center justify-center border-b relative">
          {state === "expanded" ? (
            <Image
              src="/logo.png"
              alt="Logo"
              width={130}
              height={32}
              priority
            />
          ) : (
            <Image
              src="/logoIcon.png"
              alt="Logo"
              width={32}
              height={32}
              priority
            />
          )}

          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-1 border shadow-md hover:scale-110 transition-transform"
          >
            <ChevronLeft
              className={cn(
                "h-3 w-3 transition-transform",
                !open && "rotate-180"
              )}
            />
          </button>
        </SidebarHeader>

        {/* sidebar content */}
        <SidebarContent className="px-2 no-scrollbar ">
          {sidebarSections.map((section) => (
            <SidebarGroup key={section.label}>
              {/* lable section */}
              <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
              {/* section items */}
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
                        "flex items-center gap-3 px-3 py-5 transition-all",
                        item.active
                          ? "bg-sidebar-primary hover:bg-sidebar-primary/70 font-semibold"
                          : ""
                      )}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center w-full"
                      >
                        <item.icon className="size-4 shrink-0"/>
                        <span className="text-base tracking-wide">
                          {item.title}
                        </span>

                        {item.expandable && (
                          <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>

        {/* sidebar footer */}
        <SidebarFooter className="p-4 border-t">
          <div
            className={cn(
              "flex items-center gap-2 text-xs text-muted-foreground",
              !open && "justify-center"
            )}
          >
            <span className="font-mono bg-muted px-1 py-0.5 rounded">
              v8.1.10
            </span>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
