import { useEffect, useState } from "react";
import Layout from "@/components/layouts/Layout";
import { Code, MoreVertical, Plus, CalendarDays } from "lucide-react";
import { useParams } from "react-router-dom";
import api from "@/services/api";
import type { AreaWithProjects } from "@/types/AreaTypes/area.types";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AreaPage() {
  const { id: areaId } = useParams();

  const [area, setArea] = useState<AreaWithProjects | null>();

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

  interface StatCardProps {
    title: string;
    value: number;
  }

  const StatCard = ({ title, value }: StatCardProps) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );

  interface ProjectCardProps {
    name: string;
    description: string;
    startDate: string;
    dueDate: string;
  }

  const ProjectCard = ({
    name,
    description,
    startDate,
    dueDate,
  }: ProjectCardProps) => {
    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    return (
      <Card className="cursor-pointer transition-colors hover:bg-muted/50">
        <CardHeader>
          <CardTitle className="text-base">{name}</CardTitle>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4" />

            <span>{formatDate(startDate)}</span>

            <span>→</span>

            <span>{formatDate(dueDate)}</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      {!area ? (
        <div className="flex h-full items-center justify-center">
          <Spinner className="size-8" />
        </div>
      ) : (
        <div className="flex h-full flex-col space-y-5">
          <header className="flex space-x-20">
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
                <Code className="size-5" />
              </div>

              <div>
                <h3 className="text-xl font-semibold">{area.name}</h3>
                <p className="text-sm font-normal text-muted-foreground">
                  Personal projects and tasks Personal projects and tasks
                  Personal projects and tasks Personal projects and tasks
                  Personal projects and tasks Personal projects and tasks
                  Personal projects and tasks Personal projects and tasks
                  Personal projects and tasks Personal projects and tasks
                  Personal projects and tasks Personal projects and tasks
                  Personal projects and tasks Personal projects and tasks
                  Personal projects and tasks
                </p>
              </div>
            </div>
            <div>
              <Button variant="ghost" size="icon">
                <MoreVertical />
              </Button>
            </div>
          </header>
          <Separator></Separator>

          {/* Stat Cards */}
          <section className="grid sm:grid-cols-4 gap-5">
            <StatCard title={"Projects"} value={8} />
            <StatCard title={"Active Tasks"} value={12} />
            <StatCard title={"Completed Tasks"} value={5} />
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
            {/* <div className="w-full h-full flex items-center justify-center border">
              <p className="text-gray-600">No Projects</p>
            </div> */}

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
          </section>
        </div>
      )}
    </Layout>
  );
}
