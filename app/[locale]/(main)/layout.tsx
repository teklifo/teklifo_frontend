import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden container mx-auto mt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
