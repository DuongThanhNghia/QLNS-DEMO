import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  isLoading: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employees', err);
        this.isLoading = false;
      }
    });
  }
}
