import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = ' http://localhost:8080/POC/';
  constructor(private http: HttpClient) {}
  loadGrid(): Observable<any> {
    return this.http.get(this.baseUrl + 'findall');
  }
  addEmployee(employeeInfo: any): Observable<any> {
    return this.http.post(this.baseUrl + 'save', employeeInfo);
  }
  editEmployee(employeeInfo: any): Observable<any> {
    return this.http.put(
      this.baseUrl + 'updateemp/' + employeeInfo.id,
      employeeInfo
    );
  }
  deleteEmployee(employeeInfo: any): Observable<any> {
    return this.http.delete(
      this.baseUrl + 'deleteemp/' + employeeInfo.id,
      {body:employeeInfo}
    );
  }
}
