"use client";

import Timeline from "@/components/ui/timeline";
import ciclonaturaHqImg from "@/assets/ciclonatura_headquarters.jpg";

const settings = {
  textColor: "#0f172a",
  mutedTextColor: "#64748b",
  activeColor: "#059669",
  backgroundColor: "#ffffff",
  duration: 1.4,
};

export default function TimelineDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  return (
    <div className="bg-white text-slate-900 border-b border-slate-200/80">
      {/* Clean Timeline Section */}
      <Timeline
        title="Nuestra Trayectoria"
        periodLabel="2018 — 2026"
        backgroundColor={s.backgroundColor}
        textColor={s.textColor}
        mutedTextColor={s.mutedTextColor}
        activeColor={s.activeColor}
        imageUrl={ciclonaturaHqImg}
        imageAlt="Sede corporativa Ciclonatura y unidades express en CDMX"
        duration={s.duration}
      />
    </div>
  );
}
