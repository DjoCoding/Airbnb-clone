export default function DataSkeleton() {
    return(
        <div
            className="border-b border-b-gray-200 py-3 overflow-hidden"
        >
            <div className="flex flex-col gap-2 justify-between">
                <div className="bg-gray-300 w-xl h-6 rounded" />
                <div className="bg-gray-300 w-sm h-3 rounded" />
            </div>
        </div>
    )
}