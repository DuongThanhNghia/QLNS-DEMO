import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css'],
})
export class StaffFormComponent {
  staff: any = {
    name: '',
    gender: '',
    birthdate: '',
    email: '',
    position: '',
    shift: '',
    salary: 0,
    startDate: '',
  };

  constructor(private employeeService: EmployeeService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Dữ liệu gửi lên:', this.staff); // Log dữ liệu để kiểm tra
      this.employeeService.addEmployee(this.staff).subscribe({
        next: (response: any) => {
          alert('Thêm nhân viên thành công!');
          form.reset();
        },
        error: (error: any) => {
          console.error('Lỗi xảy ra khi gửi yêu cầu:', error); // Log lỗi chi tiết
          if (error.status === 400) {
            alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
          } else if (error.status === 409) {
            alert('Email đã tồn tại. Vui lòng sử dụng email khác.');
          } else {
            alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
          }
        },
      });
    } else {
      alert('Form không hợp lệ. Vui lòng kiểm tra lại.');
    }
  }
  
}
