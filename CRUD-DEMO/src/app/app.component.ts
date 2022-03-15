import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from './service/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterContentChecked {
  constructor(private employeeService: EmployeeService) {}
  ngAfterContentChecked(): void {
    this.gridContainerEl = document.querySelector('.table-container')!;
  }
  ngOnInit(): void {
    document.body.addEventListener('click', () => {
      this.isModalShow = false;
      this.isDeleteModalShow = false;
      this.isTriggerValidation = false;
      this.setDefaultAttr();
      this.employeeForm.setValue({
        id: '',
        name: '',
        address: '',
        designation: '',
      });
    });
    this.loadEmployeeGrid();
  }
  gridContainerEl!: HTMLDivElement;
  title = 'crud';
  modalHeader = 'Add Employee';
  gridData: any[] = [
    { name: 'Pandian', designation: 'Dev', address: 'Chennai', id: 1 },
    { name: 'Pandian', designation: 'Dev', address: 'Chennai', id: 1 },
  ];
  isModalShow = false;
  isDeleteModalShow = false;
  isTriggerValidation = false;
  isAdd = true;
  deleteInfo: any = null;
  employeeForm = new FormGroup({
    name: new FormControl(''),
    designation: new FormControl(''),
    address: new FormControl(''),
    id: new FormControl(''),
  });
  loadEmployeeGrid() {
    this.employeeService.loadGrid().subscribe((responseData) => {
      this.gridData = responseData;
    });
  }
  onEditClick(evt: MouseEvent, rowData: any) {
    this.employeeForm.setValue(rowData);
    this.isAdd = false;
    this.modalHeader = 'Edit Employee';
    this.isModalShow = true;
    evt.stopPropagation();
    this.gridContainerEl.style.opacity = '0.5';
    this.gridContainerEl.style.pointerEvents = 'none';
  }
  onDeleteClick(evt: MouseEvent, rowData: any) {
    this.deleteInfo = rowData;
    this.isDeleteModalShow = true;
    evt.stopPropagation();
    this.gridContainerEl.style.opacity = '0.5';
    this.gridContainerEl.style.pointerEvents = 'none';
  }
  onAddClick(evt: MouseEvent) {
    this.employeeForm.setValue({
      id: '',
      name: '',
      address: '',
      designation: '',
    });
    this.isAdd = true;
    this.modalHeader = 'Add Employee';
    this.isModalShow = true;
    evt.stopPropagation();
    this.gridContainerEl.style.opacity = '0.5';
    this.gridContainerEl.style.pointerEvents = 'none';
  }
  setDefaultAttr() {
    this.gridContainerEl.style.opacity = '1';
    this.gridContainerEl.style.pointerEvents = '';
  }
  preventModalClose(evt: MouseEvent) {
    evt.stopPropagation();
  }
  onSaveClick() {
    this.isTriggerValidation = true;
    if (!this.employeeForm.valid) return;
    if (this.isAdd) {
      this.addRecord();
    } else {
      this.editRecord();
    }
  }
  addRecord() {
    const employeeInfo = this.employeeForm.value;
    delete employeeInfo.id;
    this.employeeService.addEmployee(employeeInfo).subscribe((response) => {
      this.loadEmployeeGrid();
      this.isTriggerValidation = false;
      this.isModalShow = false;
      this.setDefaultAttr();
    });
  }
  editRecord() {
    const employeeInfo = this.employeeForm.value;
    this.employeeService.editEmployee(employeeInfo).subscribe((response) => {
      this.loadEmployeeGrid();
      this.isTriggerValidation = false;
      this.isModalShow = false;
      this.setDefaultAttr();
    });
  }
  onDeleteCancel() {
    this.isDeleteModalShow = false;
    this.setDefaultAttr();
  }
  onDeleteApprove() {
    this.employeeService
      .deleteEmployee({ id: this.deleteInfo.id })
      .subscribe((response) => {
        this.loadEmployeeGrid();
        this.setDefaultAttr();
      });
  }
}
