import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardLayout />
      <div className="p-4 md:ml-64">{children}</div>
    </>
  );
}
