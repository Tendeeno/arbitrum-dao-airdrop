import { useState, useEffect } from "react";
const tabs = [
  { name: "Actual", href: "#", idx: 0 },
  { name: "Custom Price", href: "#", idx: 1 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Tabs = ({ onChange }) => {
  const [currentTabIdx, setCurrentTabIdx] = useState(0);

  useEffect(() => {
    onChange(currentTabIdx);
  }, [currentTabIdx]);
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.idx === currentTabIdx).name}>
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs">
          {tabs.map((tab, tabIdx) => (
            <div
              onClick={() => setCurrentTabIdx(tabIdx)}
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.idx === currentTabIdx
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
              )}
              aria-current={tab.idx === currentTabIdx ? "page" : undefined}>
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.idx === currentTabIdx
                    ? "bg-indigo-500"
                    : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};
export default Tabs;
