import { Button } from "../ui/Button";

export default function NoItemsFound({ text }: Readonly<{ text?: string }>) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow">
      <div className="mb-4">
        <svg
          className="w-16 h-16 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        No Items Found
      </h2>
      <p className="text-gray-600 mb-6">
        {text ?? "We couldn't find any items matching your criteria."}
      </p>
      <Button onClick={() => window.history.back()}>Go Back</Button>
    </div>
  );
}
