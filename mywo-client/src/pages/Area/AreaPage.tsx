import { useEffect, useState } from "react";
import Layout from "@/components/layouts/Layout";
import { Folder, MoreVertical, Plus, icons } from "lucide-react";
import { useParams } from "react-router-dom";
import api from "@/services/api";
import type { AreaWithProjects } from "@/types/AreaTypes/area.types";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProjectCard from "./ProjectCard";
import AreaStatCard from "./AreaStatCard";
import AreaForm from "./AreaForm";
import { useNavigate } from "react-router-dom";

export default function AreaPage() {
  const { id: areaId } = useParams();

  const [area, setArea] = useState<AreaWithProjects | null>();
  const [openForm, setOpenForm] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getArea = async () => {
      setArea(null);
      try {
        const response = await api.get(`/areas/${areaId}`);
        const area = response.data.data;

        setArea(area);
      } catch (error) {
        console.error(error);
      }
    };

    getArea();
  }, [areaId]);

  const handleDeleteArea = async (id: string) => {
    setIsDeleteLoading(true);
    try {
      await api.delete(`/areas/${id}`);
      setOpenDeleteDialog(false);
      navigate("/workspace");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Layout>
      {!area ? (
        <div className="flex h-full items-center justify-center">
          <Spinner className="size-8" />
        </div>
      ) : (
        <div className="flex h-full flex-col space-y-5">
          <header className="flex justify-between space-x-5 sm:space-x-20">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className={`flex shrink-0 size-10 items-center justify-center rounded-lg ${
                  area.color
                    ? "bg-(--area-color)/10 text-(--area-color)"
                    : "bg-blue-500/10 text-blue-500"
                }`}
                style={
                  {
                    "--area-color": area.color,
                  } as React.CSSProperties
                }
              >
                {/* Dynamically set the icon */}
                {(() => {
                  const Icon = icons[area.icon as keyof typeof icons] ?? Folder;
                  return <Icon className="size-5" />;
                })()}
              </div>

              <div>
                <h3 className="text-xl font-semibold">{area.name}</h3>
                <p className="text-sm font-normal text-muted-foreground">
                  {area.description}
                </p>
              </div>
            </div>

            {/* Options */}
            <div>
              <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger
                  render={
                    <Button variant="ghost" size="icon">
                      <MoreVertical />
                    </Button>
                  }
                />

                <PopoverContent align="end" className="w-40 p-1">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        setOpenPopover(false);
                        setOpenForm(true);
                      }}
                    >
                      Update area
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={() => {
                        setOpenPopover(false);
                        setOpenDeleteDialog(true);
                      }}
                    >
                      Delete area
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Confirm Delete Dialog */}
              <Dialog
                open={openDeleteDialog}
                onOpenChange={setOpenDeleteDialog}
              >
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Delete Area?</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this area? This action
                      cannot be undone.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <DialogClose
                      render={
                        <Button type="button" variant="outline">
                          Cancel
                        </Button>
                      }
                    />

                    <Button
                      type="button"
                      variant="destructive"
                      disabled={isDeleteLoading}
                      onClick={() => handleDeleteArea(area.id)}
                    >
                      {isDeleteLoading ? <Spinner /> : "Delete"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {openForm && (
                <AreaForm
                  open={openForm}
                  onOpenChange={setOpenForm}
                  area={area}
                  onAreaChange={setArea}
                  isUpdate={true}
                />
              )}
            </div>
          </header>
          <Separator></Separator>

          {/* Stat Cards */}
          <section className="grid sm:grid-cols-4 gap-5">
            <AreaStatCard title={"Projects"} value={8} />
            <AreaStatCard title={"Active Tasks"} value={12} />
            <AreaStatCard title={"Completed Tasks"} value={5} />
          </section>

          <Separator></Separator>

          {/* Projects */}
          <section className="flex min-h-0 flex-1 flex-col space-y-3">
            <header className="flex justify-between items-center">
              <h1 className="text-base font-semibold">Projects</h1>
              <Button>
                <Plus /> New Project
              </Button>
            </header>
            {area.projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <ProjectCard
                  name="My Portfolio"
                  description="Build my personal developer portfolio."
                  startDate="2026-09-07T00:15:19.344Z"
                  dueDate="2026-10-30T00:15:19.344Z"
                />
                <ProjectCard
                  name="My Portfolio"
                  description="Build my personal developer portfolio."
                  startDate="2026-09-07T00:15:19.344Z"
                  dueDate="2026-10-30T00:15:19.344Z"
                />
                <ProjectCard
                  name="My Portfolio"
                  description="Build my personal developer portfolio."
                  startDate="2026-09-07T00:15:19.344Z"
                  dueDate="2026-10-30T00:15:19.344Z"
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-600">No Projects</p>
              </div>
            )}
          </section>
        </div>
      )}
    </Layout>
  );
}
