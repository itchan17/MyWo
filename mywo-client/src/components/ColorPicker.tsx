const PRESET_COLORS = [
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Yellow", value: "#eab308" },
  { name: "Green", value: "#22c55e" },
  { name: "Emerald", value: "#10b981" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Purple", value: "#a855f7" },
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap space-x-2 space-y-2">
      {PRESET_COLORS.map((color, i) => (
        <div
          key={i}
          className={`rounded-full w-5 h-5 ${
            value === color.value ? "ring-2 ring-offset-2 ring-blue-500" : ""
          }`}
          style={{ backgroundColor: color.value }}
          onClick={() =>
            color.value === value ? onChange("") : onChange(color.value)
          }
        />
      ))}
    </div>
  );
};
