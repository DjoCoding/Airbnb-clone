import Data from "./Profile/Data";
import FAQ from "./Profile/FAQ";

export default function Profile() {
    return (
        <div className="flex flex-col gap-15">
            <h1 className="font-bold text-gray-500 text-5xl">Profile</h1>
            <div className="flex gap-4 justify-between mb-15">
                <Data />
                <FAQ />
            </div>
        </div>
    )
}