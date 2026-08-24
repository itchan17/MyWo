import { useState, useEffect } from "react";
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
import api from "@/services/api";

interface Area {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

interface areaWithProjects extends Area {
  projects: Project[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export default function AppSidebar() {
  const [openForm, setOpenForm] = useState(false);
  const [areas, setAreas] = useState<areaWithProjects[]>([]);

  useEffect(() => {
    const getAreas = async () => {
      try {
        const response = await api.get("/areas", {
          params: {
            includeProjects: true,
          },
        });
        console.log(response);
        setAreas(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAreas();
  }, []);

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
              <Dialog open={openForm} onOpenChange={setOpenForm}>
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
                <AreaForm open={openForm} onOpenChange={setOpenForm} />
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
                          <SidebarMenuSubItem key={project.id}>
                            <SidebarMenuSubButton className={"no-underline!"}>
                              <span>{project.name}</span>
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
