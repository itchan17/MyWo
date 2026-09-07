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
import { LogOut, Plus, Layers, icons, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AreaForm from "@/pages/Area/AreaForm";
import api from "@/services/api";
import { useAreaStore } from "@/stores/areaStore";
import { useNavigate } from "react-router-dom";

export default function AppSidebar() {
  const navigate = useNavigate();

  // Area store
  const areas = useAreaStore((state) => state.areas);
  const setAreas = useAreaStore((state) => state.setAreas);

  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    console.log("RENDER SIDEBAR");
    const getAreas = async () => {
      try {
        const response = await api.get("/areas", {
          params: {
            includeProjects: true,
            pageNumber: 1,
            pageSize: 20,
          },
        });
        setAreas(response.data.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    getAreas();
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b h-16 flex flex-row items-center justify-between group-data-[collapsible=icon]:justify-center px-2">
        <span className="font-semibold text-xl group-data-[collapsible=icon]:hidden">
          MyWo
        </span>
      </SidebarHeader>

      <SidebarContent>
        {/* Explore */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Explore"
                onClick={() => navigate("/workspace")}
              >
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
              {areas.map((area) => {
                const Icon = icons[area.icon as keyof typeof icons];

                return (
                  <AccordionItem
                    key={area.id}
                    value={String(area.id)}
                    className="border-none"
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        render={
                          <AccordionTrigger className="rounded-sm p-1 hover:bg-sidebar-accent hover:brightness-90" />
                        }
                      >
                        {Icon ? <Icon className="size-4" /> : <Folder />}

                        <span
                          onClick={() => navigate(`/areas/${area.id}`)}
                          className="mr-auto cursor-pointer hover:underline"
                        >
                          {area.name}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

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
                );
              })}
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
