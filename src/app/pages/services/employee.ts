import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIResponse } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class Employees {

  constructor() { }
  http = inject(HttpClient)
  onLogin(obj: any) {
    return this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login", obj)
  }
  get(): Observable<APIResponse> {
    return this.http.get<APIResponse>("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployees");
  }
  getdeps() {
    return this.http.get("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetDepartments").pipe(map((res: any) => res.data)
    )
  }
  getroles() {
    return this.http.get("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllRoles").pipe(map((res: any) => res.data)
    )
  }
  post(obj: any) {
    return this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeLeave/CreateEmployee", obj)
  }
  put(obj: any) {
    return this.http.put("https://freeapi.miniprojectideas.com/api/EmployeeLeave/UpdateEmployee", obj)
  }
  delete(obj: number) {
    return this.http.delete(`https://freeapi.miniprojectideas.com/api/EmployeeLeave/DeleteEmployee?id=${obj}`)
  }
  postl(obj: any) {
    return this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeLeave/AddLeave", obj)
  }
  getl(empid: number) {
    return this.http.get(`https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllLeavesByEmployeeId?id=${empid}`)
  }
}