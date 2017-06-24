import htmlparser from "htmlparser2"

const toKeep = [ "ul", "ol", "li", "p" ]
const titles = [ "h1", "h2", "h3", "h4", "h5", "h6" ]

export const flatener = ({content}) => {
    let result= ""
    const parser = new htmlparser.Parser({
        onopentag: (tagname, attribs) => {
            
            //Cherche les titres et ferme le dernier paragraphe à l'ouverture d'un titre
            if(titles.indexOf(tagname) !== -1){
                result += "</p><"+tagname+">"
            
            //Cherche les autres balises a garder et recrée la balise en supprimant style et classe
            } else if (toKeep.indexOf(tagname) !== -1){
                result += "<"+tagname+">"
            
            //Cherche les images et recrée la balise en supprimant style et classe
            } else if( tagname === "img"){
                console.log(attribs)
                result += "<p><img src=" + attribs.src + " alt=" + attribs.alt + " class=" + attribs.class + " height=" + attribs.height + " width=" +attribs.width + " /></p>"
            }
        },
        ontext: (text) => {
            result += text
        },
        onclosetag: (tagname) => {
            if(titles.indexOf(tagname) !== -1){
                result += "</"+tagname+"><p>"
            } else if (toKeep.indexOf(tagname) !== -1){
                result += "</"+tagname+">"
            }
        }
    }, {decodeEntities: true});
        parser.write(content);
        parser.end();

        //Cherche les caractères spéciaux créés par le parse du html et les supprime
        result = result.replace(/\n|\r|\t|\f\[\b]/gm, "").replace("<p></p>", "") + "</p>"
        if(result.indexOf("</p>" === 0)){
            result.replace("</p>", "")
        }
        
        return { content: result }
}