import { useState } from "react";

const ChartTab: React.FC = () => {
  const [selected, setSelected] = useState<
    "optionOne" | "optionTwo" | "optionThree"
  >("optionOne");

  const getButtonClass = (option: "optionOne" | "optionTwo" | "optionThree") =>
    selected === option
      ? "bg-[var(--pasuseva-orange)] text-white shadow font-semibold"
      : "text-[var(--pasuseva-green)] bg-transparent hover:bg-[var(--pasuseva-orange)]/10 hover:text-[var(--pasuseva-orange)]";

  return (
    <div className="flex items-center gap-2 rounded-lg bg-[var(--pasuseva-green)]/10 p-1 dark:bg-[var(--pasuseva-green)]/20">
      <button
        onClick={() => setSelected("optionOne")}
        className={`px-4 py-2 rounded-md transition-colors duration-150 ${getButtonClass(
          "optionOne"
        )}`}
      >
        Monthly
      </button>

      <button
        onClick={() => setSelected("optionTwo")}
        className={`px-4 py-2 rounded-md transition-colors duration-150 ${getButtonClass(
          "optionTwo"
        )}`}
      >
        Quarterly
      </button>

      <button
        onClick={() => setSelected("optionThree")}
        className={`px-4 py-2 rounded-md transition-colors duration-150 ${getButtonClass(
          "optionThree"
        )}`}
      >
        Annually
      </button>
    </div>
  );
};

export default ChartTab;
