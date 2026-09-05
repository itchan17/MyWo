import React from "react";
import Layout from "@/components/layouts/Layout";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AreaCard from "@/components/area_components/AreaCard";
import { useAreaStore } from "@/stores/areaStore";

export default function WorkspacePage() {
  // Area store
  const areas = useAreaStore((state) => state.areas);

  return (
    <Layout>
      <div className="grid grid-cols-6 gap-5 border-red-700 h-full w-full">
        <div className="col-span-4">
          {/* Recently Opened Projects Section */}
          <section>
            <h1 className="text-lg font-medium">Recently Opened</h1>
          </section>
          {/* Areas Section */}
          <section>
            <div className="flex justify-between mb-3">
              <h1 className="text-lg font-medium">Areas</h1>
              <Button variant="ghost" size="sm">
                View All Areas
                <ArrowRight />
              </Button>
            </div>
            <div className="space-y-5">
              {areas.slice(0, 5).map((area) => (
                <AreaCard area={area} key={area.id} />
              ))}
            </div>
          </section>
        </div>
        <aside className="border border-black col-span-2"></aside>
      </div>
    </Layout>
  );
}
