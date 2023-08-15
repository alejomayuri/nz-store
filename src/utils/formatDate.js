export const formatDate = (seconds, ms = true) => {
    const milliseconds = ms ? seconds * 1000 : seconds // Convertir segundos a milisegundos

    const date = new Date(milliseconds); // Crear objeto Date a partir de los milisegundos

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate
}