import { useState } from "react";

// Reusable FlexDirectionToggle component with visual icons
export const FlexDirectionToggle = ({ value, onChange }) => {
  const options = [
    {
      value: "row",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      label: "Row layout",
    },
    {
      value: "column",
      icon: (
        <svg
          className="w-4 h-4 rotate-90"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      label: "Column layout",
    },
  ];

  return (
    <div className="flex gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          title={option.label}
          className={`p-2 rounded-sm border ${value === option.value
            ? "bg-neutral-700 text-neutral-50 border-neutral-700"
            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-300"
            }`}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
};

export const JustifyContentSelector = ({ value, direction = "row", onChange }) => {
  const options = [
    { value: "flex-start", justifyClass: "justify-start" },
    { value: "center", justifyClass: "justify-center" },
    { value: "flex-end", justifyClass: "justify-end" },
    { value: "space-between", justifyClass: "justify-between" },
    { value: "space-around", justifyClass: "justify-around" },
    { value: "space-evenly", justifyClass: "justify-evenly" },
  ];

  return (
    <div className="flex flex-wrap gap-1">
      {options.map((option) => {
        const isSelected = value === option.value;
        const needsGap = !option.value.includes("space");

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            title={option.value}
            className={`rounded-sm border p-1 ${
              isSelected
                ? "bg-neutral-700 text-neutral-50 border-neutral-700"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-300"
            }`}
          >
            <div
              className={`flex p-[2px] ${
                direction === "row"
                  ? "h-6 w-10 items-center"
                  : "h-10 w-6 flex-col items-center"
              } ${option.justifyClass} ${needsGap ? "gap-[2px]" : ""}`}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`rounded-xs ${
                    direction === "row"
                      ? "h-[10px] w-[5px]"
                      : "h-[5px] w-[10px]"
                  } ${isSelected ? "bg-neutral-50" : "bg-neutral-500"}`}
                />
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
};




export const AlignItemsSelector = ({ value, direction = "row", onChange }) => {
  const options = [
    { value: "flex-start", alignClass: "items-start" },
    { value: "center", alignClass: "items-center" },
    { value: "flex-end", alignClass: "items-end" },
  ];

  return (
    <div className="flex gap-1 flex-wrap">
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            title={option.value}
            className={`rounded-sm border p-1 ${
              isSelected
                ? "bg-neutral-700 border-neutral-700"
                : "bg-neutral-100 border border-neutral-300 hover:bg-neutral-200"
            }`}
          >
            <div
              className={`flex p-[2px] ${
                direction === "row"
                  ? `h-6 w-10 ${option.alignClass} justify-between`
                  : `h-10 w-6 flex-col ${option.alignClass} justify-between`
              }`}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${
                    direction === "row"
                      ? "h-[12px] w-[5px]" // aligned vertically
                      : "h-[5px] w-[12px]" // aligned horizontally
                  } ${isSelected ? "bg-white" : "bg-neutral-500"}`}
                />
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
};





export const SizeSelector = ({ label, value, onChange }) => {
  const [mode, setMode] = useState(value?.includes("%") ? "%" : "px");

  const handlePresetClick = (preset) => {
    setMode("%");
    onChange(`${preset}%`);
  };

  const handleCustomChange = (e) => {
    const px = e.target.value.replace(/\D/g, ""); // allow only digits
    onChange(px ? `${px}px` : "");
    setMode("px");
  };

  const handleFitContent = () => {
    onChange("fit-content");
    setMode("fit");
  };

  return (
    <div>
      <label className="block text-xs font-medium text-neutral-700 mb-1">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 items-center">
        {/* Fit Content Button */}
        <button
          onClick={handleFitContent}
          className={`px-2 py-1 text-xs rounded-sm ${
            value === "fit-content"
              ? "bg-neutral-700 text-neutral-50"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
          }`}
        >
          Fit
        </button>

        {/* Preset % options */}
        <div className="flex gap-1">
          {[25, 50, 75, 100].map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetClick(preset)}
              className={`px-2 py-1 text-xs rounded-sm ${
                value === `${preset}%`
                  ? "bg-neutral-700 text-neutral-50"
                  : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
              }`}
            >
              {preset}%
            </button>
          ))}
        </div>

        {/* Custom px input */}
        <input
          type="text"
          value={value?.endsWith("px") ? value.replace("px", "") : ""}
          onChange={handleCustomChange}
          placeholder="px"
          className="w-[60px] text-xs border rounded-sm p-1 text-center border-neutral-500 text-neutral-700"
        />
      </div>
    </div>
  );
};



// Padding control
// Padding control
export const PaddingSelector = ({ value, onChange }) => {
  const options = ["0px", "2px", "4px", "6px", "8px"];

  return (
    <div className="flex gap-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-2 py-1 text-xs rounded-sm ${
            value === option
              ? "bg-neutral-700 text-neutral-50"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

// Margin control
export const MarginSelector = ({ value, onChange }) => {
  const options = ["0px", "2px", "4px", "6px", "8px"];

  return (
    <div className="flex gap-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-2 py-1 text-xs rounded-sm ${
            value === option
              ? "bg-neutral-700 text-neutral-50"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

// Gap control
export const GapSelector = ({ value, onChange }) => {
  const options = ["0px", "4px", "8px", "12px", "16px"];

  return (
    <div className="flex gap-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-2 py-1 text-xs rounded-sm ${
            value === option
              ? "bg-neutral-700 text-neutral-50"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};




// TextAlignSelector.jsx
export const TextAlignSelector = ({ value, onChange }) => {
  const options = ["left", "center", "right", "justify"];

  return (
    <div className="flex gap-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-2 py-1 text-xs rounded-sm ${
            value === option
              ? "bg-neutral-700 text-neutral-50"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

// Font Size Selector component
export const FontSizeSelector = ({ value, onChange }) => {
  const options = [
    { value: "12px", label: "tiny" },
    { value: "14px", label: "small" },
    { value: "16px", label: "normal" },
    { value: "18px", label: "medium" },
    { value: "20px", label: "large" },
    { value: "24px", label: "x-large" },
    { value: "32px", label: "huge" },
  ];

  return (
    <div className="grid grid-cols-4 gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 py-1 text-xs rounded-sm ${
            value === option.value
              ? "bg-neutral-700 text-neutral-50"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

// Font Weight Selector component
export const FontWeightSelector = ({ value, onChange }) => {
  const options = [
    { value: "300", label: "light" },
    { value: "400", label: "normal" },
    { value: "500", label: "medium" },
    { value: "600", label: "semi-bold" },
    { value: "700", label: "bold" },
    { value: "800", label: "extra-bold" },
    { value: "900", label: "black" },
  ];

  return (
    <div className="grid grid-cols-4 gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 py-1 text-xs text-nowrap rounded-sm ${
            value === option.value
              ? "bg-neutral-700 text-neutral-50"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};





// Reusable BorderWidthSelector component
export const BorderWidthSelector = ({ value, onChange }) => {
  const options = ["0px","1px", "2px", "4px", "6px"];
  const currentWidth = value.split(" ")[0] || "0px";

  const handleChange = (width) => {
    const newBorder = width === "0px" ? "0px" : `${width}`;
    onChange("borderWidth", newBorder);
  };

  return (
    <div className="flex gap-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleChange(option)}
          className={`px-2 py-1 text-xs rounded-sm ${
            currentWidth === option
              ? "bg-neutral-700 text-neutral-50"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

// Reusable BorderRadiusSelector component
export const BorderRadiusSelector = ({ value, onChange }) => {
  const options = [
    { value: "0px", label: "none" },
    { value: "4px", label: "small" },
    { value: "8px", label: "medium" },
    { value: "16px", label: "large" },
    { value: "9999px", label: "rounded" },
  ];

  return (
    <div className="flex flex-wrap gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 py-1 text-xs rounded-sm ${
            value === option.value
              ? "bg-neutral-700 text-neutral-50"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

// Box Shadow Selector component
export const BoxShadowSelector = ({ value, onChange }) => {
  const options = [
    { value: "none", label: "none" },
    { value: "0 1px 3px 0 rgba(0, 0, 0, 0.1)", label: "small" },
    { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", label: "medium" },
    { value: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", label: "large" },
  ];

  return (
    <div className="flex gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 py-1 text-xs rounded-sm ${
            value === option.value
              ? "bg-neutral-700 text-neutral-50"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};









export const ColorInput = ({ label, property, value, onChange }) => (
  <div>
    <label className="block text-xs font-medium text-neutral-700 mb-1">
      {label}
    </label>
    <div className="flex gap-2 items-center">
      <button
        onClick={() => onChange(property, "transparent")}
        className={`px-2 py-1 text-xs rounded-sm ${
          value === "transparent"
            ? "bg-neutral-700 text-neutral-50"
            : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
        }`}
      >
        Transparent
      </button>
      <input
        type="color"
        value={value !== "transparent" ? value || "#000000" : "#000000"}
        onChange={(e) => onChange(property, e.target.value)}
        className="flex-1 p-0 border rounded-sm h-8 border-neutral-300 text-neutral-700 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
      />
    </div>
  </div>
);




// Generic reusable input for border controls
export const BorderStyleInput = ({ label, property, value, options, onChange }) => (
  <div>
    <label className="block text-xs font-medium text-neutral-700 mb-1">
      {label}
    </label>
    <div className="flex gap-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(property, option)}
          className={`px-2 py-1 text-xs rounded-sm ${
            value === option
              ? "bg-neutral-700 text-neutral-50"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

// Special case for border color (needs color picker)
export const BorderColorInput = ({ value, onChange }) => (
  <div>
    <label className="block text-xs font-medium text-neutral-700 mb-1">
      Border Color
    </label>
    <div className="flex gap-2 items-center">
      <button
        onClick={() => onChange("borderColor", "transparent")}
        className={`px-2 py-1 text-xs rounded-sm ${
          value === "transparent"
            ? "bg-neutral-700 text-neutral-50"
            : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
        }`}
      >
        Transparent
      </button>
      <input
        type="color"
        value={value !== "transparent" ? value || "#000000" : "#000000"}
        onChange={(e) => onChange("borderColor", e.target.value)}
        className="flex-1 p-0 border rounded-sm h-8 border-neutral-300 text-neutral-700 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
      />
    </div>
  </div>
);



export const HoverColorInput = ({ label, property, value, onchange, defaultColor }) => (
  <div>
    <label className="block text-xs font-medium text-neutral-700 mb-1">
      {label}
    </label>
    <div className="flex gap-2 items-center">
      <button
        onClick={() => onchange(property, "transparent")}
        className={`px-2 py-1 text-xs rounded-sm ${
          value === "transparent"
            ? "bg-neutral-700 text-neutral-50"
            : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
        }`}
      >
        Transparent
      </button>
      <input
        type="color"
        value={value !== "transparent" ? value || defaultColor : defaultColor}
        onChange={(e) => onchange(property, e.target.value)}
        className="flex-1 p-0 border rounded-sm h-8 border-neutral-300 text-neutral-700 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
      />
    </div>
  </div>
);





// HoverShadowSelector.jsx
export const HoverShadowSelector = ({ value, onChange }) => {
  const options = [
    { value: "none", label: "none" },
    { value: "0 1px 3px 0 rgba(0, 0, 0, 0.1)", label: "small" },
    { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", label: "medium" },
    { value: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", label: "large" },
  ];

  return (
    <div>
      <label className="block text-xs font-medium mb-1 text-neutral-700">
        Hover Shadow
      </label>
      <div className="flex gap-1 flex-wrap">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-2 py-1 text-xs rounded-sm ${
              value === option.value
                ? "bg-neutral-700 text-neutral-50"
                : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};


// Icon Color Input component
export const IconColorInput = ({ label, property, value, onChange }) => (
  <div>
    <label className="block text-xs font-medium mb-1">{label}</label>
    <div className="flex gap-2 items-center">
      <button
        onClick={() => onChange(property, "transparent")}
        className={`px-2 py-1 text-xs rounded ${
          value === "transparent"
            ? "bg-neutral-700 text-white"
            : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
        }`}
      >
        Transparent
      </button>
      <input
        type="color"
        value={value !== "transparent" ? value || "#000000" : "#000000"}
        onChange={(e) => onChange(property, e.target.value)}
        className="flex-1 p-0 border rounded h-8 border-neutral-300"
      />
    </div>
  </div>
);


// Icon Size Selector component
export const IconSizeSelector = ({ value, onChange }) => {
  const options = [
    { value: "12", label: "XS" },
    { value: "16", label: "SM" },
    { value: "20", label: "MD" },
    { value: "24", label: "LG" },
    { value: "32", label: "XL" },
  ];

  return (
    <div className="flex gap-1 flex-wrap">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 py-1 text-xs rounded ${
            value === option.value
              ? "bg-neutral-700 text-white"
              : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};