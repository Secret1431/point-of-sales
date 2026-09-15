export function ProductHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between">
            <div>
                <h2 className="text-2xl text-slate-600 font-bold">
                    Product Form
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                    Manage all products here.
                </p>
            </div>
        </div>
    )
}