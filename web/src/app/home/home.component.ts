import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as hljs from 'highlight.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class Home implements OnInit {
  example: string = `
    let errlogger = new FrontendErrLog({
        detailedErrors: true,
        remoteLogging: true,
        remoteSettings: {
            url: 'http://xxxxx:xxxx/err/sendErrInfo',
            proId: 'your peojectId',
        }
    });`

  ngOnInit() {
    hljs.initHighlightingOnLoad();
  }


}
