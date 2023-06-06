import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ArticleServiceService} from '../../../service/article-service.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';

declare const Swal: any;
import Quill from 'quill';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  flag = false;
  currentDate: string;
  inputImage: any = null;
  articleDTO: FormGroup;
  quillFormControl: FormControl;

  text: any = null;

  imgLink: any = null;
  maxSize = false;

  constructor(private articleService: ArticleServiceService,
              private storage: AngularFireStorage,
              private route: Router,
              private title:Title) {
    // this.quillFormControl = new FormControl("", [Validators.required, Validators.maxLength(50000), Validators.minLength(50)]);

    this.articleDTO = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
      img: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required, Validators.maxLength(50000), Validators.minLength(50)]),
      publicDate: new FormControl(this.currentDate),
      isFeature: new FormControl(false),
      isFlag: new FormControl(false),
    }, []);

  }

  ngOnInit(): void {
    const editor = new Quill('#editor', {
      theme: 'snow'
    });
    this.title.setTitle("Thêm mới tin tức")
  }


  submit(articleDTO: FormGroup) {
    const divData = document.getElementById('editor').innerHTML;


    this.flag = true;
    this.maxSize = false;
    if (this.articleDTO.valid && this.inputImage != null) {
      articleDTO.controls.content.setValue(divData);
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      this.currentDate = `${year}-${month}-${day}`;

      const nameImg = formatDate(new Date(), 'dd-MM-yyyy_hh:mm:ss:a_', 'en-US') + this.inputImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.inputImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.articleDTO.value.img = url;
            this.articleService.saveArticle(articleDTO.value).subscribe();
          });
        })
      ).subscribe(a => {
      }, error => {
      }, () => {
        // Swal.fire('Thêm tin thành công');
      })

      Swal.fire('Xong', 'Thêm tin thành công', 'success');
      this.route.navigateByUrl("/article");
    }else {
      if (this.articleDTO.invalid||this.inputImage==null) {

            Swal.fire('Lỗi', 'Thêm tin thất bại', 'error');
          }

    }
  }

  selectImage(event: any) {
    this.inputImage = event.target.files[0];
    if (this.inputImage.size > 10485760 && this.inputImage!=null) {
      this.maxSize = true;
      event.target.value = null;
      this.articleDTO.value.img = null;
      this.inputImage = null;
      this.imgLink = null;
    } else if (this.inputImage) {
      this.maxSize = false;
      const reader = new FileReader();
      reader.readAsDataURL(this.inputImage);
      reader.onload = (e: any) => {
        this.imgLink = e.target.result;
      };
    }
  }

  back() {
    this.route.navigateByUrl('/article');
  }

  checkContent($event: any) {
    this.text = $event.target.innerHTML;
    this.text = this.text.toString().replace(/<[^>]+>/g, '');
    this.articleDTO.controls.content.setValue(this.text);
    this.flag = false;
  }

}
