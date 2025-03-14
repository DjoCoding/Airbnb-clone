import useCreatePlaceForm from "../../../../hooks/place/useCreatePlaceForm";

interface PicturesProps {
}

function Picture({ url }: { url: string}) {
    return(
        <div className="flex items-center justify-center rounded-3xl size-30">
            <img src={url} alt="picture" className="object-cover size-full rounded-3xl" />
        </div>
    )
}


export default function Pictures({}: PicturesProps) {
    const { data: { pictures }, errors, actions: { uploadPicture } } = useCreatePlaceForm(); 

    const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if(!files) return;
        if(files.length == 0) return;
        for(const file of files) {
            uploadPicture(file);
        }
    }

    return(
      <div className="px-10 grow py-2 flex flex-col items-center justify-around gap-20">
        <h1 className="w-full px-2 py-2 text-4xl font-bold text-gray-500">Set place pictures</h1>
        <label className="cursor-pointer border-2 border-gray-400 rounded-xl py-2 px-2 w-full max-w-[400px] items-center justify-center flex flex-col">
            <input type="file" multiple accept="image" className="hidden" onChange={handlePictureUpload}/>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-30 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            </div>
            <p className="text-lg text-gray-500">
                upload the place pictures here
            </p>
        </label>
        <div className="grow px-2 py-4 w-full grid max-lg:grid-cols-2 max-sm:grid-cols-1 grid-cols-5 gap-x-2 gap-y-5">
            {
                pictures.length > 0
                ?
                pictures.map(pic => {
                    const url = URL.createObjectURL(pic);
                    return <Picture url={url} />
                })
                :
                (
                    errors.pictures
                    ?
                    <p className="text-lg text-red-500">{errors.pictures}</p>
                    :
                    <p className="text-lg text-gray-700">No picture uploaded</p>
                )
            }
        </div>
      </div>
    )
}