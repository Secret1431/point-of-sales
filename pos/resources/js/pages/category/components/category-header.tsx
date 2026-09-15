export function CategoryHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
            <div>
                <h2 className="text-2xl text-slate-600 font-bold">
                    Category Form
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                    Manage all categories here.
                </p>
            </div>
        </div>
    )
}