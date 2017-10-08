import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PreviewService {

  constructor(private http: Http) { }

  public newProject(proInfo) {
    return this.http.post('/project/newProject', proInfo).map(res => res.json())
  }

  public deleteProject(project) {
    return this.http.post('/project/deleteProject', project).map(res => res.json())
  }

  public getCols() {
    return this.http.get('/user/getUserProjects').map(res => res.json());
  }

  public uploadSourceMap(formData) {
    // 添加http 请求头
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // let opts = new RequestOptions();
    // opts.headers = headers
    return this.http.post('/project/uploadSM', formData).map(res => res.json());
  }
}
