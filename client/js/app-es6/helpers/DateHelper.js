export class DateHelper {

    constructor() {
        throw new Error('DateHelper can\'t be instantiated')
    }

    static stringToDate(dateString) {

        if(!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) 
            throw new Error('Method stringToDate expects a string in the format dd-mm-yyyy');

        return new Date(
            ...dateString
                .split('/')
                .map((item, index) => item - index % 2)
                .reverse()
        );
    }

    static dateToString(objDate) {
        return `${objDate.getDate()}/${objDate.getMonth() + 1}/${objDate.getFullYear()}`
    }
}