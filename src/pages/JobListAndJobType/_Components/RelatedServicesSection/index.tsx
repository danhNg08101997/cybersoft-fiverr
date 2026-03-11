import React from "react";

export default function RelatedServicesSection(): React.JSX.Element {
    const serviceTags = [
        "Minimalist logo design",
        "Signature logo design",
        "Mascot logo design",
        "3d logo design",
        "Hand drawn logo design",
        "Vintage logo design",
        "Remove background",
        "Photo restoration",
        "Photo retouching",
        "Image resize",
        "Product label design",
        "Custom twitch overlay",
        "Custom twitch emotes",
        "Gaming logo",
        "Children book illustration",
        "Instagram design",
        "Movie poster design",
        "Box design",
        "Logo maker",
        "Logo ideas",
    ];

    return (
        <section className="w-full bg-white">
            <div className="mx-auto max-w-350 px-6 py-10 lg:px-8">
                <h2 className="mb-8 text-center text-[25px] font-bold tracking-tight text-gray-800">
                    Services Related To Graphics & Design
                </h2>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    {serviceTags.map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            className="rounded-full bg-gray-100 px-5 py-2 text-[15px] font-medium text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}