export default function AboutGig({ description }: { description: string }) {
    const paragraphs = description
        .split(/\r?\n+/)
        .map((text) => text.trim())
        .filter(Boolean);

    return (
        <section className="mt-12 border-t border-[#e4e5e7] pt-10">
            <h2 className="text-[24px] font-bold text-[#222325]">About this gig</h2>
            <div className="mt-4 max-w-205 space-y-5 text-[16px] leading-8 text-[#62646a]">
                {paragraphs.length > 0
                    ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
                    : <p>No description available.</p>}
            </div>
        </section>
    );
}