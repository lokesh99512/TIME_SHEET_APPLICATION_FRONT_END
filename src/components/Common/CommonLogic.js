/** * Formats the size */
export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

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