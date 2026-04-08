import {Trophy} from "lucide-react";

function TrophyComponent() {
    return (
        <div className="mt-8 flex items-center gap-3 rounded-xl border border-[#e4e5e7] bg-[#fafafa] px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-[#e4e5e7]">
                <Trophy className="h-5 w-5 text-[#74767e]" />
            </div>
            <p className="text-[14px] leading-7">
                <span className="font-bold text-[#222325]">People keep coming back!</span>{' '}
                This seller has a strong record of repeat buyers and consistent delivery quality.
            </p>
        </div>
    );
}

export default TrophyComponent;