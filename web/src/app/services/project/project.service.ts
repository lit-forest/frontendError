import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService {

  constructor(private http: Http) { }

  public getErrInfosByProId(proId) {
    return this.http.post('/project/getErrInfosByProId', { proId }).map(res => res.json())
  }
}
