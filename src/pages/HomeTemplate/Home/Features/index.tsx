
function FeatureComponent() {
    return (
        <section className="bg-green-50 py-14">

            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">

                <div>
                    <h3 className="text-3xl font-bold">
                        A whole world of freelance talent at your fingertips
                    </h3>

                    <ul className="mt-6 space-y-4 text-gray-700">

                        <li>
                            <b>The best for every budget</b>
                            <br/>
                            Find high-quality services at every price point.
                        </li>

                        <li>
                            <b>Quality work done quickly</b>
                            <br/>
                            Find the right freelancer within minutes.
                        </li>

                        <li>
                            <b>Protected payments</b>
                            <br/>
                            Pay only when the work is approved.
                        </li>

                        <li>
                            <b>24/7 support</b>
                            <br/>
                            Our team is always here to help.
                        </li>

                    </ul>
                </div>

                <img
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                    className="rounded-xl"
                />

            </div>

        </section>
    );
}

export default FeatureComponent;