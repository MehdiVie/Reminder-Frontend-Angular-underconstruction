export interface ApiResponse<T> {
    status : string ;
    message : string ;
    data : T ;
    timeStamp : string
}