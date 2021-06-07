import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input() fromParent:any;
  constructor( public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.fromParent);
  }

  closeModal(sendData:any) {
    this.activeModal.close(sendData);
  }


}
