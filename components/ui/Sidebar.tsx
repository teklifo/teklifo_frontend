import { SidebarProps } from "@/types";

const Sidebar = ({ display, children }: SidebarProps) => {
  return (
    <aside
      id="sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        display ? "translate-x-0" : "-translate-x-full"
      } bg-sky-500 md:translate-x-0 dark:bg-sky-400`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-sky-500 dark:bg-sky-400">
        {children}
      </div>
    </aside>
  );
};

export default Sidebar;
