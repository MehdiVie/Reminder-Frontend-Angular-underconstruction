import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

type SnackType = 'success' | 'error' | 'info';

@Injectable({
    providedIn : 'root'
})

export class SnackbarService {
    constructor(private snackbar : MatSnackBar){}

    show(message : string , type : SnackType = 'info' , duration = 4000 ,
        vPos : MatSnackBarVerticalPosition = 'top' ,
        hPos : MatSnackBarHorizontalPosition = 'center') {

        const panelClass = {
            'success' : 'snackbar-success' , 
            'error' : 'snackbar-error' , 
            'info' : 'snackbar-info'
        }[type];

        this.snackbar.open(
            message , 
            'Close' , 
            {
                duration : 4000 ,
                panelClass : [panelClass] , 
                verticalPosition : 'top' ,
                horizontalPosition : 'center'
            }

        );
    }
}