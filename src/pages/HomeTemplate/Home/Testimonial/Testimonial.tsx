function TestimonialComponent() {
    return (
        <section className="max-w-6xl mx-auto py-14 px-6 grid md:grid-cols-2 gap-10">

            <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                className="rounded-xl"
            />

            <div className="flex flex-col justify-center">

                <p className="text-gray-600 mb-3">
                    Kay Kim, Co-Founder · rooted
                </p>

                <p className="text-lg font-medium">
                    “It's extremely exciting that Fiverr has freelancers from all
                    over the world — it broadens the talent pool.”
                </p>

            </div>

        </section>
    );
}

export default TestimonialComponent;