function TrustedComponent() {
    return (
        <section className="border-b border-slate-100 bg-gray-100">
            <div className="mx-auto max-w-7xl px-6">
                <div
                    className="flex h-[84px] items-center justify-center gap-10 text-[12px] font-semibold text-slate-300 md:gap-14">
                    <span className="text-slate-300">Trusted by:</span>

                    <span className="tracking-[0.18em] text-slate-300">FACEBOOK</span>
                    <span className="text-[16px] font-bold tracking-tight text-slate-200">
        Google
      </span>
                    <span className="tracking-[0.22em] text-slate-300">NETFLIX</span>
                    <span className="font-serif text-[16px] italic text-slate-300">P&amp;G</span>
                    <span className="text-[16px] font-bold italic text-slate-300">PayPal</span>
                </div>
            </div>
        </section>
    );
}

export default TrustedComponent;