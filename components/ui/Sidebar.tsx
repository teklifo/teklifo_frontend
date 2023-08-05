import { SidebarProps } from "@/types";

const Sidebar = ({ display, children }: SidebarProps) => {
  return (
    <aside
      id="sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        display ? "translate-x-0" : "-translate-x-full"
      } bg-white border-r border-zinc-200 md:translate-x-0 dark:bg-zinc-900 dark:border-zinc-800`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-zinc-900">
        <ul className="space-y-2 font-medium">{children}</ul>
      </div>
    </aside>
  );
};

export default Sidebar;
