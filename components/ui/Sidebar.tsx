import { SidebarProps } from "@/types";

const Sidebar = ({ display, children }: SidebarProps) => {
  return (
    <aside
      id="sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform border-r border-zinc-300 dark:border-zinc-800 ${
        display ? "translate-x-0" : "-translate-x-full"
      } bg-white md:translate-x-0 dark:bg-zinc-900`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-zinc-900">
        {children}
      </div>
    </aside>
  );
};

export default Sidebar;
