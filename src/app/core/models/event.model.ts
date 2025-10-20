// shared Event model - used across services and components
export interface Event {
    id : number ,
    title : string ,
    description ?: string ,
    eventDate : string , // ISO date string
    reminderTime : string // ISO date string
}