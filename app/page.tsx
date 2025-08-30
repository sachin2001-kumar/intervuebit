import { About } from "@/app/Components/About";
import FAQ from "./Components/FAQ";
import { HomeCom } from "./Components/HomeCom";
// import { Navbar } from "./Components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-blue-400 to-yellow-200">
      {/* <Navbar /> */}
      <HomeCom />
      <About />
      <FAQ />
    </div>
  );
}
