import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AreaStatCard {
  title: string;
  value: number;
}

export default function AreaStatCard({ title, value }: AreaStatCard) {
  return (
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
}
