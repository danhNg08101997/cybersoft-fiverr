import {ShieldCheck} from "lucide-react";

function Vetted() {
    return (
        <section className="mt-10">
            <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#404145]" />
                <h2 className="text-[24px] font-bold text-[#222325]">Vetted by Fiverr Pro</h2>
            </div>
            <p className="mt-3 max-w-190 text-[16px] leading-8 text-[#62646a]">
                This professional is positioned as a premium seller with stronger service quality,
                delivery history, and credibility for more complex software projects.
            </p>
        </section>
    );
}

export default Vetted;