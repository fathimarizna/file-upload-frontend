import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularUpload';

  displaySingleImage!: Boolean;
  displaySingleImageArray!: Array<any>;

  @ViewChild('singleInput', { static: false })
  singleInput!: ElementRef;

  images: any;

  constructor(private http: HttpClient) {
    this.displaySingleImage = false;
    this.displaySingleImageArray = [];
  }
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.images = file;
    }
  }
  onSubmit() {
    const formdata = new FormData();
    formdata.append('file', this.images);

    this.http.post<any>('http://localhost:3000/file', formdata).subscribe((res) => {
      console.log(res);
      this.singleInput.nativeElement.value = '';
      this.displaySingleImage = true;
      this.displaySingleImageArray.push(res.path);
    },
      (err) => {
        console.log(err);
      }
    );
  }

}
