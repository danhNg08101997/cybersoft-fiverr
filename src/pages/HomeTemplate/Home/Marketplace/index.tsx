function MarketplaceComponent() {
    const marketplace = [
        "Graphics & Design",
        "Digital Marketing",
        "Writing & Translation",
        "Video & Animation",
        "Music & Audio",
        "Programming & Tech",
        "Business",
        "Lifestyle",
        "Data",
    ]
    return (
        <section className="bg-gray-50 py-14">

            <div className="max-w-6xl mx-auto px-6">

                <h3 className="text-2xl font-bold mb-8">
                    Explore the marketplace
                </h3>

                <div className="grid md:grid-cols-5 gap-6">

                    {marketplace.map((item) => (
                        <div
                            key={item}
                            className="bg-white p-6 rounded shadow text-center font-medium"
                        >
                            {item}
                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}

export default MarketplaceComponent;