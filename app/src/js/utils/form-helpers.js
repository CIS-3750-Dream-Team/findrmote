export function touchAllFields(...fields) {
    const touchedFields = {};

    for (let field of fields) {
        touchedFields[field] = true;
    }

    return touchedFields;
}