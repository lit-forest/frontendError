import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PreviewService } from '../services/preview/preview.service';
import { LoginService } from '../services/login/login.service';

import { FileValidator } from '../utils/file-input.validator';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  imgs: Array<string> = [
    "https://images.unsplash.com/photo-1467913356746-bcd9e501b9d5?dpr=1&auto=compress,format&fit=max&w=376&q=80&cs=tinysrgb&crop=",
    "https://images.unsplash.com/photo-1503321198697-12670ff8acdd?dpr=1&auto=compress,format&fit=max&w=376&q=80&cs=tinysrgb&crop=",
    "https://images.unsplash.com/photo-1495161054557-8377ed519797?dpr=1&auto=compress,format&fit=max&w=376&q=80&cs=tinysrgb&crop=",
    'https://images.unsplash.com/photo-1496347646636-ea47f7d6b37b?dpr=1&auto=compress,format&fit=max&w=376&q=80&cs=tinysrgb&crop=',
    'https://images.unsplash.com/photo-1452696024259-cb7474e79947?dpr=1&auto=compress,format&fit=max&w=376&q=80&cs=tinysrgb&crop=',
    'https://images.unsplash.com/photo-1416163026265-0bc340a710e4?dpr=1&auto=compress,format&fit=max&w=376&q=80&cs=tinysrgb&crop=',
    "https://images.unsplash.com/photo-1471623432079-b009d30b6729?dpr=1&auto=compress,format&fit=max&w=376&q=80&cs=tinysrgb&crop=",
    "https://images.unsplash.com/photo-1422222128122-eb6e96ac18a0?dpr=1&auto=compress,format&fit=max&w=376&q=80&cs=tinysrgb&crop=",
    "https://images.unsplash.com/photo-1418846531910-2b7bb1043512?dpr=1&auto=compress,format&fit=max&w=376&q=80&cs=tinysrgb&crop=",
    "https://images.unsplash.com/photo-1503541492994-11c0925b6b73?dpr=1&auto=compress,format&fit=max&w=376&q=80&cs=tinysrgb&crop=",

  ];

  isShowNewForm: boolean = false;
  isHavePro: boolean = false;
  collections: Array<{
    pId: string,
    pName: string,
    updateTime: string,
    showFileUpload: any
  }> = [];
  username: string = '';

  newProjectForm: FormGroup;
  fileUploadForm: FormGroup;

  @ViewChild('fileUpaload') fileUpaload;

  constructor(private fb: FormBuilder, private router: Router, private previewService: PreviewService, private loginService: LoginService) {
    this.newProjectForm = fb.group({
      pName: [null, Validators.required],
      pDirector: [null, Validators.required],
    });
  }

  private createItem(): FormGroup {
    return this.fb.group({
      fileUpaload: ['', FileValidator.validate],
      hello: 'file select'
    })
  }
  ngOnInit() {
    this.getProjectsByUserId()
  }

  private getProjectsByUserId() {
    this.previewService.getCols().subscribe(res => {
      this.collections = res.data.projects;
      this.username = res.data.username;
    })
  }

  showNewFrom() {
    this.isShowNewForm = !this.isShowNewForm;
  }

  private showFileUpload(selectedCol) {
    this.fileUploadForm = this.createItem();
    this.collections.forEach(col => {
      if (col.pId === selectedCol.pId) {
        selectedCol.showFileUpload = !selectedCol.showFileUpload;
      } else {
        col.showFileUpload = false;
      }
    })
  }

  private handleNewProject(projectInfo) {
    let userId = this.loginService.getUserId('islogged');
    Object.assign(projectInfo, { updateTime: new Date().getTime() })

    let params = {
      userId,
      pInfo: projectInfo
    }
    this.previewService.newProject(params).subscribe(res => {
      if (res.status) {
        this.isShowNewForm = false;
        let userId = this.loginService.getUserId('islogged');
        this.getProjectsByUserId()
      } else {
        this.isHavePro = true;
      }
    })
  }

  private fileUploadChange() {
    let fileBrowser = this.fileUpaload.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      console.log(fileBrowser.files)
    }
  }

  private handleFileUpload(col) {
    let fileBrowser = this.fileUpaload.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      let formData = new FormData();
      formData.append('pId', col.pId)
      for (let i = 0, len = fileBrowser.files.length; i < len; i++) {
        formData.append('fileUpaload', fileBrowser.files[i], fileBrowser.files[i]['name']);
      }
      this.previewService.uploadSourceMap(formData).subscribe(res => {
        col.showFileUpload = false;
      })
    }
  }

  private deleteProject(col) {
    let userId = this.loginService.getUserId('islogged');
    let params = {
      userId,
      pId: col.pId
    }

    this.previewService.deleteProject(params).subscribe(res => {
      let userId = this.loginService.getUserId('islogged');
      this.getProjectsByUserId()
    })

  }

  private linkToProDetails(col) {
    this.router.navigate(['/project', col.pId]);
  }
}
