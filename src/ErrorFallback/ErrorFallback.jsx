
function ErrorFallback({error}) {
    return (
        <div className="min-h-screen bg-mist-100 flex justify-center items-center">
            <div className="py-20 w-full bg-red-200 text-red-900 border border-red-200 text-center">
                <h2 className="text-3xl font-bold">Something went wrong with the Notes layout:</h2>
                <p className="text-xl text-red-600">{error.message}</p>
            </div>
        </div>
    );
}

export default ErrorFallback;