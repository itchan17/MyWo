import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

interface ProjectCardProps {
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
}

export default function ProjectCard({
  name,
  description,
  startDate,
  dueDate,
}: ProjectCardProps) {
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
}
