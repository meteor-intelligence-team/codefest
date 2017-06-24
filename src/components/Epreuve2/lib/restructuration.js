//import htmlparser from "htmlparser2"

export const restructuration = ({content}) => {
    //let result= ""
    const error = {}
    let getH1 = content.indexOf("h1") !== -1 
    let getH2 = [] 
    let getH3 = [] 
    let getH4 = [] 
    let getH5 = [] 
    let getH6 = []

    for( let i = 0; i < content.length; i++ ) {
        if ( content[i] + content[i + 1] === "h2" ) getH2.push(i)
        if ( content[i] + content[i + 1] === "h3" ) getH3.push(i)
        if ( content[i] + content[i + 1] === "h4" ) getH4.push(i)
        if ( content[i] + content[i + 1] === "h5" ) getH5.push(i)
        if ( content[i] + content[i + 1] === "h6" ) getH6.push(i)
    }

    console.log(content.length, getH1, getH2, getH3, getH4, getH5, getH6)
    if(!getH1){
        error.reason = "Vous devez ajouter un titre (h1) afin de finir la restructuration de votre document"
    }
        
    return { content, error }
}