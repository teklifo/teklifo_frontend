import { cookies } from "next/headers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
      <Navbar user={user} />
      <main className="overflow-hidden container mx-auto mt-14 md:mt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
