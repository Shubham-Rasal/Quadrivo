import CodeCard from "@/components/ui/code_card";
import Footer from "@/components/ui/footer";
import Hero from "@/components/ui/hero";
import Navbar from "@/components/ui/navbar";
import Tech from "@/components/ui/tech";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar />
      <Hero />
      <Tech />
      <CodeCard />
      <Footer />
    </main>
  );
}
