import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JoinService {

  constructor(private http: Http) { }

  public join(userinfo) {
    return this.http.post('/user/join', userinfo).map(res => res.json())
  }
}
