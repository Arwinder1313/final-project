import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  @Input() fromParent: any;
  loading:boolean =false;
  imgUpload: any = '';
  constructor(private toastr: ToastrService, private api: ApiService, private formBuilder: FormBuilder, public activeModal: NgbActiveModal) {
    this.productForm = this.formBuilder.group({
      name: ["", Validators.compose([Validators.required])],
      price: ["", Validators.compose([Validators.required])],
      description: ["", Validators.compose([Validators.required])],
      stock: ["", Validators.compose([Validators.required])],
    });

  }

  ngOnInit(): void {

  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.productForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
  // showToaster(){
  //   this.toastr.success("Hello, I'm the toastr message.")
  // }
  onSubmit() {
    console.log(this.imgUpload)
    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return;
    }
    if (this.imgUpload == '') {
      return
    }
    this.loading = true;
    var formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('avatar', this.imgUpload);
    formData.append('descr', this.productForm.value.description);
    formData.append('stock', this.productForm.value.stock);
    formData.append('price', this.productForm.value.price);
    var headers = new Headers();
    headers.append('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');
    var that = this;
    var url = '/create.php';
    $.ajax({
      url: this.api.appUrl + url,
      data: formData,
      processData: false,
      contentType: false,
      method: "post",
      success: function (res: any) {
        var result =JSON.parse(res);
        console.log(result.message)
        that.loading =false;
        if (result['status']) {
          that.toastr.success(result.message);
          that.productForm.reset();
          that.closeModal();

        } else {
          that.toastr.success(result.message);

        }
      },
    }, (err: any) => {
    });
    // var data = {
    //   name: this.productForm.value.name,
    //   price: this.productForm.value.price,
    //   stock: this.productForm.value.stock ,
    //   descr: this.productForm.value.description,
    //   avatar: this.imgUpload
    // }
    // this.api.post('/create.php', data).subscribe(res => {
    //   console.log(res);
    //   if(res.status){        
    //   }
    // })
  }
  upload(evn: any) {
    this.imgUpload = $("#fupload")[0].files[0];
    console.log(this.imgUpload)

  }
  onReset() {
    this.submitted = false;
    this.imgUpload ='';
    this.productForm.reset();
  }
  closeModal() {
    this.activeModal.close('dddd');
  }
}
