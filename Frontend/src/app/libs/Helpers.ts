export default class Helpers {

    // Función para remover signos ortográficos
    static accentRemove(pWord: string): string {

        // Pasamos la palabra a minúsculas
        let word = pWord.toLowerCase();

        // Removemos signos ortográficos de la A
        let notAccent = word.replace(/á/g, 'a');
        notAccent = notAccent.replace(/à/g, 'a');
        notAccent = notAccent.replace(/ä/g, 'a');
        notAccent = notAccent.replace(/â/g, 'a');

        // Removemos signos ortográficos de la E
        notAccent = notAccent.replace(/é/g, 'e');
        notAccent = notAccent.replace(/è/g, 'e');
        notAccent = notAccent.replace(/ë/g, 'e');
        notAccent = notAccent.replace(/ê/g, 'e');

        // Removemos signos ortográficos de la I
        notAccent = notAccent.replace(/í/g, 'i');
        notAccent = notAccent.replace(/ì/g, 'i');
        notAccent = notAccent.replace(/ï/g, 'i');
        notAccent = notAccent.replace(/î/g, 'i');

        // Removemos signos ortográficos de la O
        notAccent = notAccent.replace(/ó/g, 'o');
        notAccent = notAccent.replace(/ò/g, 'o');
        notAccent = notAccent.replace(/ö/g, 'o');
        notAccent = notAccent.replace(/ô/g, 'o');

        // Removemos signos ortográficos de la U
        notAccent = notAccent.replace(/ú/g, 'u');
        notAccent = notAccent.replace(/ù/g, 'u');
        notAccent = notAccent.replace(/ü/g, 'u');
        notAccent = notAccent.replace(/û/g, 'u');

        //Removemos signos de otros caracteres
        notAccent = notAccent.replace(/ñ/g, 'n');
        notAccent = notAccent.replace(/ç/g, 'c');
        return notAccent
    }

}