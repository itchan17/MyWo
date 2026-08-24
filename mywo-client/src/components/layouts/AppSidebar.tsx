import { useState } from "react";
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
} from "@/components/ui/sidebar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { LogOut, Plus, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AreaForm from "@/pages/Area/AreaForm";

const areas = [
  {
    id: 1,
    name: "Development",
    projects: ["MyWo", "Portfolio", "API Refactor"],
  },
  {
    id: 2,
    name: "Learning",
    projects: ["React", "C#", "SQL"],
  },
  {
    id: 3,
    name: "Personal",
    projects: [],
  },
  {
    id: 4,
    name: "Development",
    projects: ["MyWo", "Portfolio", "API Refactor"],
  },
  {
    id: 5,
    name: "Learning",
    projects: ["React", "C#", "SQL"],
  },
  {
    id: 6,
    name: "Personal",
    projects: [],
  },
  {
    id: 7,
    name: "Development",
    projects: ["MyWo", "Portfolio", "API Refactor"],
  },
  {
    id: 8,
    name: "Learning",
    projects: ["React", "C#", "SQL"],
  },
  {
    id: 9,
    name: "Personal",
    projects: [],
  },
];

export default function AppSidebar() {
  const [icon, setIcon] = useState("");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border flex flex-row items-center justify-between group-data-[collapsible=icon]:justify-center px-2 py-4">
        <span className="font-semibold text-xl group-data-[collapsible=icon]:hidden">
          MyWo
        </span>
      </SidebarHeader>

      <SidebarContent>
        {/* Explore */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Explore">
                <Layers />
                <span>Workspace</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Areas */}
        <SidebarGroup>
          <SidebarGroupLabel>Areas</SidebarGroupLabel>

          <SidebarMenu>
            {/* Add Area */}
            <SidebarMenuItem>
              <Dialog>
                <DialogTrigger
                  render={
                    <Button variant="outline" className="rounded-sm w-full">
                      <Plus />
                      <span className="group-data-[collapsible=icon]:hidden">
                        Add area
                      </span>
                    </Button>
                  }
                />

                {/* Create Area Form */}
                <AreaForm />
              </Dialog>
            </SidebarMenuItem>

            {/* Areas */}
            <Accordion multiple className="w-full">
              {areas.map((area) => (
                <AccordionItem
                  key={area.id}
                  value={String(area.id)}
                  className="border-none"
                >
                  <div className="flex py-2 items-center justify-between hover:no-underline hover:bg-sidebar-accent rounded-md text-sm font-medium">
                    <span className="hover:underline cursor-pointer">
                      {area.name}
                    </span>
                    <AccordionTrigger
                      className={
                        "hover:bg-sidebar-accent hover:brightness-90 p-1 rounded-sm"
                      }
                    ></AccordionTrigger>
                  </div>

                  {/* Projects */}
                  <AccordionContent className="pb-0">
                    {area.projects.length > 0 ? (
                      <SidebarMenuSub>
                        {area.projects.map((project) => (
                          <SidebarMenuSubItem key={project}>
                            <SidebarMenuSubButton className={"no-underline!"}>
                              <span>{project}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    ) : (
                      <div className="text-center text-chart-3">
                        No projects
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button
          className={"rounded-sm"}
          // tooltip={"Logout"}
        >
          <LogOut className="text-2xl" />
          <span className="group-data-[collapsible=icon]:hidden">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
