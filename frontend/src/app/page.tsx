import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Features from "@/components/features";
import Permit from "@/components/permit";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between max-w-screen">
      <Navbar />
      <Hero />
      <Features />
      <Permit />
      <Footer />
    </main>
  );
}
