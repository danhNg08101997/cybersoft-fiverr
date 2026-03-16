
type StatsCardProps = {
    title: string;
    value: string;
}
export default function StatsCard({ title, value }: StatsCardProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

            <p className="text-gray-500">
                {title}
            </p>

            <h2 className="text-2xl font-bold mt-2">
                {value}
            </h2>

        </div>
    );
}