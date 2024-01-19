import CodeCard from "@/components/code_card";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Tech from "@/components/tech";
import About from "@/components/about";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <Hero />
      <About />
      <Tech />
      <CodeCard />
      <Footer />
    </main>
  );
}
