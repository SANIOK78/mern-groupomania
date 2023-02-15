// function permettant de traiter la "date"
export const dateParser = (num) => {

    let options = {
        hour: "2-digit",
        minute: "2-digit",
        weekday : "long",
        year: "numeric",
        month: "short", //racourci
        day: "numeric"
    }

    let timestemp = Date.parse(num);
    let date = new Date(timestemp).toLocaleDateString('fr-FR', options);

    // return la date au format "string"
    return date.toString(); 
}