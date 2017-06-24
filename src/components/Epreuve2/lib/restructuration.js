import htmlparser from "htmlparser2"

export const restructuration = ({content}) => {
    let result= ""
    let getH1 = [] 
    let getH2 = [] 
    let getH3 = [] 
    let getH4 = [] 
    let getH5 = [] 
    let getH6 = []
    
    for( let i = 0; i < content.length; i++ ) {
        console.log(content[i])
        if ( content[i] === "h" && content[i + 1] === "1" ) getH1.push(i)
        if ( content[i] === "h" && content[i + 1] === "2" ) getH2.push(i)
        if ( content[i] === "h" && content[i + 1] === "3" ) getH3.push(i)
        if ( content[i] === "h" && content[i + 1] === "4" ) getH4.push(i)
        if ( content[i] === "h" && content[i + 1] === "5" ) getH5.push(i)
        if ( content[i] === "h" && content[i + 1] === "6" ) getH6.push(i)
    }
    console.log(content.length, getH1, getH2, getH3, getH4, getH5, getH6)

        
    return { content }
}