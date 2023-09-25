export const isAnyValueEmpty = (obj,removeKey) => {
    let updatedObj = {...obj, removeKey : "1"};
    // delete updatedObj?.[removeKey];
    for (const key in updatedObj) {
        if (Object.prototype.hasOwnProperty.call(updatedObj, key)) {
            const value = updatedObj[key];
            if (value === '' || value === null || value === undefined) {
                return true;
            }
        }
    }
    return false;
};

export function customSort(array, sortField, sortOrder) {
    return [...array].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
            a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
            }) * (sortOrder === "asc" ? 1 : -1)
        );
    });
}