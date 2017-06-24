//import htmlparser from "htmlparser2"

export const restructuration = ({content}) => {
    const error = {}
    let getH1 = content.indexOf("h1") !== -1 
    let getH2 = [] 
    let getH3 = [] 
    let getH4 = [] 
    let getH5 = [] 
    let getH6 = []


    //Récupération de l'index des différents titres présents dans le DOM
    for( let i = 0; i < content.length; i++ ) {
        const balise = content[i] + content[i + 1] + content[i + 2]
        if ( balise === "<h2" ) getH2.push(i)
        if ( balise === "<h3" ) getH3.push(i)
        if ( balise === "<h4" ) getH4.push(i)
        if ( balise === "<h5" ) getH5.push(i)
        if ( balise === "<h6" ) getH6.push(i)
    }

    console.log("----------- all results -----------")
    console.log(getH1, getH2, getH3, getH4, getH5, getH6)

    if(getH6.length > 0){
        if( getH2.length > 0 && getH3.length > 0 && getH4.length > 0 && getH5.length === 0  ){
            content = content.replace(/h6/g, "h5")
        } else if( getH2.length > 0 && getH3.length > 0 && getH4.length === 0 && getH5.length === 0  ){
            content = content.replace(/h6/g, "h4")
        } else if( getH2.length > 0 && getH3.length === 0 && getH4.length === 0 && getH5.length === 0  ){
            content = content.replace(/h6/g, "h4")
        } 
    }

    if(!getH1){
        error.reason = "Vous devez ajouter un titre (h1) afin de finir la restructuration de votre document."
    }

    return { content , error }
        
}