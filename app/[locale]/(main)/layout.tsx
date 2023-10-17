import { cookies } from "next/headers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LayoutSidebar from "@/components/layout/LayoutSidebar";
import { fetchUser } from "@/app/actions/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextCookies = cookies();
  const token = nextCookies.get("token")?.value ?? "";
  const locale = nextCookies.get("NEXT_LOCALE")?.value ?? "az";

  const user = await fetchUser(token, locale);

  return (
    <>
      <LayoutSidebar user={user} />
      <main className="overflow-hidden container mx-auto mt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
