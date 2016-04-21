class Utils {
    static getFieldValue(obj: any, fieldPath: string) {
        let fields = fieldPath.split('.')
        switch (fields.length) {
            case 1:
                return obj[fieldPath];
            case 2:
                if (obj[fields[0]]) {
                    return obj[fields[0]][fields[1]];
                }
                return "-"
            case 3:
                if (obj[fields[0]]) {
                    if (obj[fields[0]][fields[1]]) {
                        return obj[fields[0]][fields[1]][fields[2]];
                    }
                }
                return "-"
            case 4:
                if (obj[fields[0]]) {
                    if (obj[fields[0]][fields[1]]) {
                        if (obj[fields[0]][fields[1]][fields[2]]) {
                            return obj[fields[0]][fields[1]][fields[2]][fields[3]];
                        }
                    }
                }
                return "-"
            default:
                return obj[fieldPath];
        }
    }
}

export {Utils}