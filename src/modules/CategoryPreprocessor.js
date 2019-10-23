
export function parseCategory(category){
    let buffer = [];
    if (category.child.length === 0){
        buffer = category.products;
    }
    else {
        category.child.forEach(elem => {
            buffer.push(...elem.products)
        })
    }
    return buffer;
}
