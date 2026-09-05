import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, MoreHorizontal, ArrowRight, icons } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AreaWithProjects } from "@/types/AreaTypes/area.types";

interface AreaCardProps {
  area: AreaWithProjects;
}

export default function AreaCard({ area }: AreaCardProps) {
  const Icon = area.icon ? icons[area.icon as keyof typeof icons] : Code;

  return (
    <Card className="group">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
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
            <Icon className="size-5" />
          </div>

          <div>
            <h3 className="text-base font-semibold">{area.name}</h3>
            <p className="text-sm font-normal text-muted-foreground">
              {area.description}
            </p>
          </div>
        </CardTitle>

        <CardAction>
          <Button variant="ghost" size="icon">
            <MoreHorizontal />
          </Button>
        </CardAction>

        <CardDescription className="pt-2">
          {area.projects.length > 1
            ? `${area.projects.length} Projects`
            : `${area.projects.length} Project`}
        </CardDescription>
      </CardHeader>

      {area.projects.length > 0 && (
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {area.projects.map((project) => (
              <Badge key={project.id} variant="secondary">
                {project.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}

      <CardFooter className="justify-end">
        <Button variant="ghost" size="sm">
          View Area
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
