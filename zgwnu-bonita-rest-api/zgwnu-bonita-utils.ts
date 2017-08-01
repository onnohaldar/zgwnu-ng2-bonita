export class ZgwnuBonitaUtils {

    getDateValue(bonitaDateValue: string): Date {
        return new Date(bonitaDateValue.substr(0, 10) + 'T' + bonitaDateValue.substr(11))
    }

}
