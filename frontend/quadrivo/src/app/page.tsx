import CodeCard from "@/components/code_card";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Tech from "@/components/tech";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <Hero />
      <Tech />
      <CodeCard />
      <Footer />
    </main>
  );
}
