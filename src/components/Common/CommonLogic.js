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
