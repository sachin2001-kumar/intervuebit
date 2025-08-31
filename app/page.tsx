import { About } from "@/app/Components/About";
import FAQ from "./Components/FAQ";
import { HomeCom } from "./Components/HomeCom";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { PastInterviewList } from "./Components/PastInterviewList";

export default function Home() {
  return (
    <div className="">
      <Navbar />

      <HomeCom />
      <About />
      {/* <PastInterviewList /> */}
      <FAQ />

      <Footer />
    </div>
  );
}
