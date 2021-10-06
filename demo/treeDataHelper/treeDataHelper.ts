export class TreeDataHelper {
    public static getParentKeySet(data: any[], parentKey: string): any[] {
        return Array.from(data.reduce((current, memo) => {
            current.add(memo[parentKey])
            return current
        }, new Set()))
    }
}


