import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from "@angular/forms";


@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit, AfterContentInit {

  input: any;

  @Input() label: string;
  @Input() errorMessage: string;

  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.input = this.model || this.control;
    if (this.input === undefined) throw new Error("Esse componente precies a ser usado com uma diretica ngModel ou FormControlName");
  }

  hasError(): Boolean {
    return !this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasSuccess(): Boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

}
