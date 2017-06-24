export const flatener = ({content}) => {
    content.blocks.map((block, i) => {
        content.blocks[i].inlineStyleRanges = []
    })
    Object.entries(content.entityMap).map((entity, i) => {
        if(entity[1].type === "LINK"){
            delete content.entityMap[entity[0]]
        }
    })
    
    return content
}