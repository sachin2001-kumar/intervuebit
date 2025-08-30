import { About } from "@/app/Components/About";
import FAQ from "./Components/FAQ";
import { HomeCom } from "./Components/HomeCom";
import { Navbar } from "./Components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-purple-400 to-purple-300">
      <Navbar />
      <HomeCom />
      <About />
      <FAQ />
    </div>
  );
}
