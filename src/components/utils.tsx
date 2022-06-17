

export function removeElement(array: Array<any>, index: number) {
    let clone = [...array];
    clone.splice(index, 1)
    return clone;
};

export function replaceElement(array: Array<any>, index: number, element: any) {
    let clone = [...array];
    clone[index] = element
    return clone
};

export function update(obj: any, attribName: string, value: any) {
    return 
    let clone = {...obj}
    clone[attribName] = value
    return clone
}