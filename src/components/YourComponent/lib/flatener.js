import htmlparser from "htmlparser2"

const toKeep = [ "ul", "ol", "li" ]
const titles = [ "h1", "h2", "h3", "h4", "h5", "h6" ]

export const flatener = ({content}) => {
    let result= ""
    const parser = new htmlparser.Parser({
        onopentag: (tagname, attribs) => {
            if(titles.indexOf(tagname) !== -1){
                result += "</p><"+tagname+">"
            } else if (toKeep.indexOf(tagname) !== -1){
                result += "<"+tagname+">"
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
        result = result.replace(/\n|\r|\t|\f\[\b]/gm, "").replace("<p></p>", "") + "</p>"
        
        return { content: result }
}