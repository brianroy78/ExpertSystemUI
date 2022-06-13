

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