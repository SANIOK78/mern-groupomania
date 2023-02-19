// function qui va convertir image en 'base64'
export default function convertToBase64(file) {

    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        // si pas d'erreur
        fileReader.onload = () => {
            resolve(fileReader.result);
        }

        // s'il y a erreur
        fileReader.onerror = (error) =>  {
            reject(error)
        }
    })
}