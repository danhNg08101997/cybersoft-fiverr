import StatsCard from "@pages/AdminTemplate/_Components/StatsCard";

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-4 gap-6">

            <StatsCard
                title="Users"
                value="1,245"
            />

            <StatsCard
                title="Jobs"
                value="532"
            />

            <StatsCard
                title="Orders"
                value="843"
            />

            <StatsCard
                title="Revenue"
                value="$12,400"
            />

        </div>
    );
}