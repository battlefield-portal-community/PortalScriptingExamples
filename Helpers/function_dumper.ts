const excludedKeys = ["Abortfunction", "AbortIffunction", "Abort", "AbortIf", "Break", "Continue", "Else", "ElseIf", "End"];
for (const key of Object.getOwnPropertyNames(mod)) {
    // @ts-ignore
    const value = mod[key];

    if (typeof value === 'function' && !excludedKeys.includes(key) && !key.endsWith("Item") && !key.startsWith("Event")) {
        try {
            value()
        } catch (e) {
            // @ts-ignore
            console.error(`Error executing function '${key}':`, e.message);
        }
    }
}