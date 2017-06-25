import htmlparser from "htmlparser2"
import _ from "lodash"

export const restructuration = ({content}) => {
    const error = {}
    let getH1 = []

    const domTree = []
    //getH2.push({ type: "h2", index: i, children: [] })
    var indexh = 0

    //Récupération de l'index des différents titres présents dans le DOM
    for( let i = 0; i < content.length; i++ ) {
        const balise = content[i - 2] + content[i - 1] + content[i]
        const block = content.substring(i);

        if ( balise === "<h1" ) getH1.push(i)
        else if ( balise === "<h2" ){
            domTree.push({ type: 2, indexOpen: i, indexClose: block.indexOf("</h2") + 3 })
        } else if ( balise === "<h3" ){
            domTree.push({ type: 3, indexOpen: i, indexClose: block.indexOf("</h3") + 3 })
        } else if ( balise === "<h4" ){
            domTree.push({ type: 4, indexOpen: i, indexClose: block.indexOf("</h4") + 3 })
        } else if ( balise === "<h5" ){
            domTree.push({ type: 5, indexOpen: i, indexClose: block.indexOf("</h5") + 3 })
        } else if ( balise === "<h6" ){
            domTree.push({ type: 6, indexOpen: i, indexClose: block.indexOf("</h6") + 3 })
        }
    }

    

    const upTitles = (type, index) => {
        let stop = false
        domTree.map((subElement, i2) => {
            if(subElement.type > type && i2 > index && stop === false && subElement.type > type + 1 ){
                domTree[i2].type--
            } else if ( i2 > index && subElement.type <= type) {
                stop = true
            }
        })
    }

    domTree.map((element, i) => {
        if(i === 0 && element.type !== 2){
            domTree[0].type = 2
            upTitles(element.type, i)
        } else {
            upTitles(element.type, i)
        }
    })

    console.log("result after", domTree)

    domTree.map((element, i) => {
        var { indexOpen, indexClose } = element
        content = content.substr(0, indexOpen) + element.type + content.substr(indexOpen + 1);
        content = content.substr(0, indexOpen + indexClose) + element.type + content.substr(indexOpen + indexClose + 1);
    })
    

    if(getH1.length === 0){
        error.reason = "Vous devez ajouter un titre (h1) afin de finir la restructuration de votre document."
    } else if(getH1.length > 1){
        error.reason = "Il ne peut y avoir qu'un seul titre h1 dans votre document"
    }

    return { content , error }
        
}