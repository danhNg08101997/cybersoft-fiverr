import { useSearchParams } from 'react-router-dom';

const filterButtons = [
  'Category',
  'Service Options',
  'Seller Details',
  'Budget',
  'Delivery Time',
];

type JobSearchHeaderProps = {
  getLength: number;
};

const JobSearchHeader = ({ getLength }: JobSearchHeaderProps) => {
  const [searchParams] = useSearchParams();

  const keyword =
    searchParams.get('keyword')?.trim() ||
    searchParams.get('tenChiTiet')?.trim() ||
    'all services';

  return (
    <section className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-350 px-3 py-3 lg:px-8">
        <div className="mb-6 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {`Results for "${keyword}"`}
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-4">
            {filterButtons.map((item) => (
              <button
                key={item}
                type="button"
                className="inline-flex h-12 items-center gap-3 rounded-md border border-gray-300 bg-white px-5 text-[15px] font-semibold text-gray-700 transition hover:border-gray-400"
              >
                <span>{item}</span>
                <svg
                  className="h-4 w-4 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-8">
            <ToggleLabel label="Pro services" />
            <ToggleLabel label="Local sellers" />
            <ToggleLabel label="Online sellers" />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] font-semibold text-gray-500">
            {`${getLength} services available`}
          </p>

          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 text-[15px] text-gray-500"
          >
            <span>Sort by</span>
            <span className="font-semibold text-gray-900">Relevance</span>
          </button>
        </div>
      </div>
    </section>
  );
};

function ToggleLabel({ label }: { label: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 text-[15px] font-semibold text-gray-700">
      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
      <span>{label}</span>
    </label>
  );
}

export default JobSearchHeader;