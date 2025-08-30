import { About } from "@/app/Components/About";
import FAQ from "./Components/FAQ";
import { HomeCom } from "./Components/HomeCom";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { PastInterviewList } from "./Components/PastInterviewList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-purple-400 to-purple-300 text-white">
      <Navbar />
      <main className="pt-2">
        <HomeCom />
        <About />
        {/* <PastInterviewList /> */}
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
