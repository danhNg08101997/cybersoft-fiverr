import type {PopularTag} from "@types";

const popularTags: PopularTag[] = [
    'Website Design',
    'WordPress',
    'Logo Design',
    'Drop shipping',
];

type PopularTagProps = {
    redirectToJobList?:(value: string) => void;
}
export default function PopularTags({redirectToJobList}: PopularTagProps) {
    return (
        <div className="mt-6 flex flex-wrap items-center gap-3 text-white/90">
            <span className="text-sm font-semibold">Popular:</span>
            {popularTags.map((tag) => (
                <button
                    key={tag}
                    type="button"
                    className="rounded-full border border-white/30 px-3 py-1 text-sm transition hover:bg-white/10"
                    onClick={() => redirectToJobList ? redirectToJobList(tag) : null}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}