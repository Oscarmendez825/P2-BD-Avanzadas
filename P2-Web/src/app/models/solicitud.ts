export interface Solicitud {
    _id?:number,
    fullName:string,
    position:string,
    department:string,
    international:boolean,
    destinationCountry:string,
    tripPurpose:string,
    startDate:Date,
    endDate:Date,
    airline:string,
    ticketPrice:number,
    accommodation:string,
    requiresTransport:boolean,
    email:string,
    status?:string
}
