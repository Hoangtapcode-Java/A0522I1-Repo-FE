import {Component,  OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArticleServiceService} from "../../../service/article-service.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";
import {Router} from "@angular/router";
declare const Swal: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  flag: boolean = false;
  currentDate: string;
  inputImage: any = null;

  articleDTO: FormGroup = new FormGroup({
    id: new FormControl(""),
    title: new FormControl("", [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
    img: new FormControl("", [Validators.required]),
    content: new FormControl("", [Validators.required, Validators.maxLength(50000), Validators.minLength(50)]),
    publicDate: new FormControl(this.currentDate),
    isFeature: new FormControl(false),
    isFlag: new FormControl(false),
  }, []);
  imgLink: any = null;
  maxSize: boolean = false;

  constructor(private articleService: ArticleServiceService,
              private storage: AngularFireStorage,
              private route: Router) {

  }

  ngOnInit(): void {
  }

  submit(articleDTO: FormGroup) {
    this.flag = true;
    this.maxSize=false;
    if (this.articleDTO.valid &&this.inputImage!=null) {
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
        this.route.navigateByUrl("/article");
      })
      Swal.fire('Done', 'Thêm tin thành công!', 'success');
    }
  }

  selectImage(event: any) {
    this.inputImage = event.target.files[0];
    if (this.inputImage.size > 1048576 && this.inputImage) {
      this.maxSize = true;
      event.target.value=null;
      this.articleDTO.value.img=null;
      this.inputImage=null;
      this.imgLink=null;
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
    this.route.navigateByUrl("/article");
  }
}
