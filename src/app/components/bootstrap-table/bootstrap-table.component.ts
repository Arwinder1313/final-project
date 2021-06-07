import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router'
import { ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ViewComponent } from './../../modals/view/view.component';
import { AddComponent } from '../add/add.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-bootstrap-table',
  templateUrl: './bootstrap-table.component.html',
  styleUrls: ['./bootstrap-table.component.css']
})
export class BootstrapTableComponent implements OnInit {
  productData: any = [];
  closeModal: string = '';
  data:any='';
  noData:boolean =false;
  loading:boolean =false;
  constructor(private toastr: ToastrService,private modalService: NgbModal, public api: ApiService, public router:Router) {
    this.getProducts();
  }

  ngOnInit(): void {
  }

  deleteModal(content:any, product:any) {
    const modalRefe =  this.modalService.open(content,
       { ariaLabelledBy: 'modal-basic-title'
      });
    this.data = product
    modalRefe.result.then((result) => {
        console.log(result);
      }, (reason) => {
        console.log(reason)
      this.closeModal = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  openModal(product:object) {
    const modalRef = this.modalService.open(ViewComponent,
      {
        scrollable: false,
        windowClass: 'myCustomModalClass',
      });

    let data = product
    modalRef.componentInstance.fromParent = data;
    
    modalRef.result.then((result) => {
      console.log(result);
      // this.getProducts();
    }, (reason) => {
    });
  }

  private getDismissReason(reason: any): string {
    console.log(reason)
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
 
  getProducts() {
    console.log("enter")
    this.loading =true;
    var data = {
    }
    this.api.get('/item_list.php', data).subscribe(res => {
      console.log(res);
      this.loading =false;
      this.noData = true;
      if (res.data.length > 0) {
        this.productData = res.data;
      }else{
        this.productData = [];
      }
    })
  }

  addPro(val:any){
    const modalRef = this.modalService.open(AddComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
      });
    let data = val
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
      this.getProducts()

    }, (reason) => {
    });
  }

  goTo(product:any) {
    console.log(product, "pro");
    this.router.navigate(['/detail'], {state: {data: JSON.stringify(product)}});
  }

  deletproduct(id:number){
    console.log(id)
    var data = {
      id: id
    }
    this.api.get('/delete.php', data).subscribe(res => {
      console.log(res);
      if(res.status){
        this.toastr.success(res.message);
        this.modalService.dismissAll();
        this.getProducts()
      }else{
        this.toastr.error(res.message);
      }
    })
  }
}
