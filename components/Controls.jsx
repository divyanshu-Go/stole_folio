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
          className={`p-2 rounded border ${value === option.value
            ? "bg-blue-500 text-white border-blue-600"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
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
        // Conditionally apply gap only when it's not a 'space-' option
        const needsGap = !option.value.includes("space");

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            title={option.value}
            className={`rounded border p-1 ${isSelected
                ? "border-blue-500 bg-blue-500"
                : "border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200"
              }`}
          >
            <div
              className={`flex p-[2px] ${direction === "row"
                  ? "h-6 w-10 items-center"
                  : "h-10 w-6 flex-col items-center"
                } ${option.justifyClass} ${needsGap ? "gap-[2px]" : ""}`}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`rounded-xs ${direction === "row" ? "h-[10px] w-[5px]" : "h-[5px] w-[10px]"
                    } ${isSelected ? "bg-white" : "bg-gray-700"}`}
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
            className={`rounded border p-1 ${isSelected
                ? "bg-blue-500 border-blue-500"
                : "bg-gray-100 border-dashed border-gray-300 hover:bg-gray-200"
              }`}
          >
            <div
              className={`flex p-[2px] ${direction === "row"
                  ? `h-6 w-10 ${option.alignClass} justify-between`
                  : `h-10 w-6 flex-col ${option.alignClass} justify-between`
                }`}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${direction === "row"
                      ? "h-[12px] w-[4px]" // aligned vertically
                      : "h-[4px] w-[12px]" // aligned horizontally
                    } ${isSelected ? "bg-white" : "bg-gray-700"}`}
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
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex gap-2 items-center">
        {/* ADD THIS BUTTON FIRST */}
        <button
          onClick={handleFitContent}
          className={`px-2 py-1 text-xs rounded ${value === "fit-content"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          Fit
        </button>

        {/* Existing preset % options */}
        <div className="flex gap-1">
          {[25, 50, 75, 100].map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetClick(preset)}
              className={`px-2 py-1 text-xs rounded ${value === `${preset}%`
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {preset}%
            </button>
          ))}
        </div>

        {/* Existing custom input */}
        <input
          type="text"
          value={value?.endsWith("px") ? value.replace("px", "") : ""}
          onChange={handleCustomChange}
          placeholder="px"
          className="w-[60px] text-xs border rounded p-1 text-center"
        />
      </div>
    </div>
  );
};


// Padding control
export const PaddingSelector = ({ value, onChange }) => {
  const options = ["0px", "2px", "4px", "6px", "8px"];

  return (
    <div className="flex gap-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-2 py-1 text-xs rounded ${value === option
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
    { value: "14px", label: "small" },
    { value: "16px", label: "normal" },
    { value: "18px", label: "large" },
    { value: "20px", label: "extra-large" },
  ];

  return (
    <div className="flex gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 py-1 text-xs rounded ${value === option.value
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
    { value: "normal", label: "normal" },
    { value: "500", label: "medium" },
    { value: "bold", label: "bold" },
    { value: "800", label: "extra-bold" },

  ];

  return (
    <div className="flex gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 py-1 text-xs rounded ${value === option.value
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};



// Reusable BorderWidthSelector component
export const BorderWidthSelector = ({ value, onChange, borderColor }) => {
  const options = ["0px", "2px", "4px", "6px"];
  const currentWidth = value.split(" ")[0] || "0px";

  const handleChange = (width) => {
    const newBorder = width === "0px" ? "0px" : `${width} solid ${borderColor}`;
    onChange(newBorder);
  };

  return (
    <div className="flex gap-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleChange(option)}
          className={`px-2 py-1 text-xs rounded ${currentWidth === option
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
    <div className="flex gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 py-1 text-xs rounded ${value === option.value
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
          className={`px-2 py-1 text-xs rounded ${value === option.value
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};