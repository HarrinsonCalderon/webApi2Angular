import { EventEmitter, Injectable, Output } from '@angular/core';
 

@Injectable({
  providedIn: 'root'
})
export class ServicioMenuService {
  @Output() disparadorMenu:EventEmitter<any>=new EventEmitter();
  constructor() { }
}
