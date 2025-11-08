import { Injectable, signal } from '@angular/core';

@Injectable ({
    providedIn : 'root'
})

export class LoadingService {
    private _pendingCount = 0;
    isLoading = signal(false);

    start() {
        this._pendingCount++;
        if (!this.isLoading()) this.isLoading.set(true);
    }

    stop() {
        this._pendingCount = Math.max(0 , --this._pendingCount);
        if (this._pendingCount === 0 && this.isLoading) this.isLoading.set     (false);
    }

    reset() {
        this._pendingCount=0;
        this.isLoading.set(false);
    }
}