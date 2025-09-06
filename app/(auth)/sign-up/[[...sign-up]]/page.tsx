import { SignUp } from "@clerk/nextjs";
import { ChartLine, Clock, ShieldCheck, Sparkles } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center p-6 md:p-10 min-h-screen">
      <SignUp />
    </div>
  );
}
