import htmlparser from "htmlparser2"

export const flatener = ({content}) => {
    let result= ""
    const parser = new htmlparser.Parser({
        onopentag: (tagname, attribs) => {
            if(tagname === "div"){
                result += "<p>"
            } else {
                result += "<"+tagname+">"
            }
        },
        ontext: (text) => {
            result += text
            console.log("-->", text);
        },
        onclosetag: (tagname) => {
            if(tagname === "div"){
                result += "</p>"
            } else {
                result += "</"+tagname+">"
            }
        }
    }, {decodeEntities: true});
        parser.write(content);
        parser.end();
        
        return { content: result }
}