import { useTranslations } from "next-intl";

interface DashboardNavbarProps {
  toggleSidebar: () => void;
}

const DashboardNavbar = ({ toggleSidebar }: DashboardNavbarProps) => {
  const t = useTranslations("Layout");

  return (
    <header className="w-full fixed top-0 z-30 bg-white border-b border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800">
      <nav className="flex items-center justify-between px-6 py-1 md:py-2">
        <div className="flex items-center justify-start">
          <button
            aria-controls="sidebar"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default DashboardNavbar;
