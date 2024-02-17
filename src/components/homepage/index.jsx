import DragDropFileUploader from "../common/input/dragDropFileInput";

const Home = () => {
    return (
        <>
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-1/2 h-full border rounded-xl p-10 shadow-2xl">
                    <DragDropFileUploader onFileAccepted={(file) => console.log(file)} />
                </div>
            </div>
        </>
    )
}

export default Home;