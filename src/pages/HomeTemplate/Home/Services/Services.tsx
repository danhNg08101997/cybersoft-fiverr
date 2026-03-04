import type {ServiceInterface} from "@types";

function ServiceComponent() {

    const services: ServiceInterface[] = [
        {
            title: "Logo Design",
            subtitle: "Build your brand",
            img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
        },
        {
            title: "WordPress",
            subtitle: "Customize your site",
            img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        },
        {
            title: "Voice Over",
            subtitle: "Share your message",
            img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
        },
        {
            title: "Video Explainer",
            subtitle: "Engage your audience",
            img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
        },
        {
            title: "Social Media",
            subtitle: "Reach more customers",
            img: "https://images.unsplash.com/photo-1516382799247-87df95d790b7",
        },
    ]

    return (
        <section className="max-w-6xl mx-auto py-12 px-6">

            <h2 className="text-2xl font-bold mb-6">
                Popular professional services
            </h2>

            <div className="grid md:grid-cols-5 gap-4">

                {services.map((service) => (
                    <div
                        key={service.title}
                        className="relative rounded-lg overflow-hidden shadow"
                    >
                        <img
                            src={service.img}
                            className="h-40 w-full object-cover"
                        />

                        <div className="absolute bottom-2 left-2 text-white">
                            <p className="text-xs">{service.subtitle}</p>
                            <p className="font-semibold">{service.title}</p>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}

export default ServiceComponent;