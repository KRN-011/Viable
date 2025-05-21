import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";

export default function DetailPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex-1">
        <div className="mt-[100px] w-3/5 mx-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
