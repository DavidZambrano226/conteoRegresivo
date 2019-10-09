import { Component, OnInit, Input } from '@angular/core';

import * as countdown from 'countdown';
import { isString } from 'util';
//interface con las propiedades de mi timer
interface Time{
  hours: number,
  minutes: number,
  seconds:number
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  //atributos del componente, timerID lo regresa el metodo countdown
  time: Time = null;
  timerId:number = null;

  @Input() date:Date | string;

  constructor() { }

  ngOnInit() {

    if(isString(this.date)){
      this.date = new Date(this.date);
    }

    //countdown(f_actual, f_final)
    this.timerId = countdown(this.date, (ts)=>{
      this.time = ts;
           
    }, countdown.HOURS | countdown.MINUTES | countdown.SECONDS);
    
  }
  ngOnDestroy(): void {
    //Destruimos cada registro que ejecuta countdown para evitar que se consuma la memoria
    if (this.timerId) {
      clearInterval(this.timerId);
      
    }
    
  }

}
