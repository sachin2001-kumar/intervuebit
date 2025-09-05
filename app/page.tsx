import { About } from "@/app/Components/About";
import FAQ from "./Components/FAQ";
import { HomeCom } from "./Components/HomeCom";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { PastInterviewList } from "./Components/PastInterviewList";
import { ContactUs } from "./Components/ContactUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <HomeCom />
        <About />
        <PastInterviewList />
        <FAQ />
        <ContactUs />
      </div>
      <Footer />
    </>
  );
}
