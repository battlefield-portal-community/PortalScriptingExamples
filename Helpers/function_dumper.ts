const excludedKeys = ["Abort", "AbortIf", "Break", "Continue", "Else", "ElseIf", "End", "Skip", "SkipIf"];
for (const key of Object.getOwnPropertyNames(mod)) {
    // @ts-ignore
    const value = mod[key];

    if (typeof value === 'function' && !excludedKeys.includes(key) && !key.endsWith("Item") && !key.startsWith("Event")) {
        try {
            value() // value(2)
        } catch (e) {
            // @ts-ignore
            console.error(`Error executing function '${key}':`, e.message);
        }
    }
}

// const excludedKeys = ["Abortfunction", "AbortIffunction", "Abort", "AbortIf", "Break", "Continue", "Else", "ElseIf", "End"];
// for (const key of Object.getOwnPropertyNames(mod)) {
//     // @ts-ignore
//     const value = mod[key];

//     if (typeof value === 'function' && !excludedKeys.includes(key) && (key.endsWith("Item") || key.startsWith("Event"))) {
//         try {
//             console.log(key)
//         } catch (e) {
//             // @ts-ignore
//             console.error(`Error executing function '${key}':`, e.message);
//         }
//     }
// }


interface TypeInfo {
    name: string;
    kind: 'function' | 'enum' | 'class' | 'object' | 'other';
}

class ModuleInspector {
    private module: any;

    constructor(moduleObj: any) {
        this.module = moduleObj;
    }
    /**
     * Get all types/classes
     */
    getTypes(): TypeInfo[] {
        const types: TypeInfo[] = [];

        for (const key of Object.keys(this.module)) {
            const value = this.module[key];

            types.push({
                name: key,
                kind: this.getTypeKind(value),
            });
        }

        return types;
    }

    /**
     * Inspect an object and get its properties
     */
    inspectObject(objectName: string): void {
        const obj = this.module[objectName];

        if (!obj) {
            console.log(`Object "${objectName}" not found`);
            return;
        }

        console.log(`\n=== ${objectName} ===`);
        const keys = Object.keys(obj);
        if (keys.length === 0) {
            console.log('  (none)');
        } else {
            for (const key of keys) {
                console.log(`  ${key}`);
            }
        }
    }

    /**
     * Determine the kind of exported value
     */
    private getTypeKind(value: any): 'object' | 'other' {
        if (typeof value === 'object' && value !== null) return 'object';
        return 'other';
    }

    /**
     * Print detailed inspection of all classes and objects
     */
    printDetailedReport() {
        const types = this.getTypes();

        // Inspect all objects
        const objects = types.filter(t => t.kind === 'object');
        objects.forEach(o => {
            this.inspectObject(o.name);
        });


    }
}

// Usage
const inspector = new ModuleInspector(mod);

// Print detailed report with all class/object members
inspector.printDetailedReport();