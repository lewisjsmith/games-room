import searchError from "../public/assets/searcherror.svg";

export default function ErrorPage() {

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-8/12 flex flex-col justify-center items-center">
                <div className="w-full flex justify-center">
                    <h2 className="font-bold text-3xl flex justify-center items-center">Error 404</h2>
                    <img src={searchError} alt="" className="w-2/12" />
                </div>
                <h3 className="w-full text-lg text-center">Oops! Page not found. </h3>
                <h3 className="w-full text-lg text-center">Please try looking elsewhere.</h3>
            </div>
        </div>
    )
}