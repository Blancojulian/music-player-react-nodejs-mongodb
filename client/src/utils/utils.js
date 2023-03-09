
const agregarCeros = (numero) => {
    return (numero < 10) ? '0' + numero : numero;
}

export const minutosYSegundos = (tiempo) => {
    if (isNaN(tiempo) || (tiempo !== 0 && !tiempo)) return '';
    const minutos = Math.floor(tiempo / 60);
    const segundos = Math.floor(tiempo % 60);
    return `${agregarCeros(minutos)}:${agregarCeros(segundos)}`;
}

export const getDuration = (file) => {

    return new Promise((resolve, reject) => {

        try {
            const freader = new FileReader();

            freader.onload = function (e) {

                const audio = new Audio(e.target.result);
                const handlerLoadMetadata = (e) => {

                    audio.removeEventListener('loadedmetadata', handlerLoadMetadata)
                    resolve(e.target.duration);
                }
                audio.addEventListener('loadedmetadata', handlerLoadMetadata)

            };
            freader.readAsDataURL(file);


        } catch (err) {
            reject(`Error al analizar el archivo:\n${err}`);
        }

        return;

    })
}