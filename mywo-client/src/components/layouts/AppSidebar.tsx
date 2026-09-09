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
import { LogOut, Plus, Layers, icons, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AreaForm from "@/pages/area/AreaForm";
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

          <SidebarMenu className="gap-2">
            {/* Add Area */}
            <SidebarMenuItem className="mb-1">
              <Button
                variant="outline"
                className="w-full rounded-sm"
                onClick={() => setOpenForm(true)}
              >
                <Plus />
                <span className="group-data-[collapsible=icon]:hidden">
                  Add area
                </span>
              </Button>

              {openForm && (
                <AreaForm open={openForm} onOpenChange={setOpenForm} />
              )}
            </SidebarMenuItem>

            {/* Areas */}
            <SidebarMenuItem>
              <Accordion multiple className="w-full space-y-1">
                {areas.map((area) => {
                  const Icon = icons[area.icon as keyof typeof icons] ?? Folder;

                  return (
                    <AccordionItem
                      key={area.id}
                      value={String(area.id)}
                      className="border-none"
                    >
                      <SidebarMenuButton
                        render={
                          <AccordionTrigger className="rounded-sm px-2 py-1.5 gap-2 hover:bg-sidebar-accent " />
                        }
                      >
                        {Icon ? (
                          <Icon className="size-4 shrink-0" />
                        ) : (
                          <Folder />
                        )}

                        <span
                          onClick={() => navigate(`/areas/${area.id}`)}
                          className="mr-auto cursor-pointer hover:underline truncate"
                        >
                          {area.name}
                        </span>
                      </SidebarMenuButton>

                      {/* Projects */}
                      <AccordionContent className="pb-1 pt-1">
                        {area.projects.length > 0 ? (
                          <SidebarMenuSub className="gap-1 ml-2 border-sidebar-border">
                            {area.projects.map((project) => (
                              <SidebarMenuSubItem key={project.id}>
                                <SidebarMenuSubButton className="no-underline!">
                                  <span>{project.name}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        ) : (
                          <div className="text-center text-chart-3 py-1 text-sm">
                            No projects
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </SidebarMenuItem>
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
