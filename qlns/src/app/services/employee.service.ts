import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  gender: string;
  birthdate: string;
  email: string;
  position: string;
  startDate: string;
}

@Injectable({
  providedIn: 'root', // Đảm bảo service được cung cấp ở cấp root
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7120/api/Employee'; // URL API backend của bạn

  constructor(private http: HttpClient) {}

  /**
   * Lấy danh sách nhân viên
   * @returns Observable<Employee[]> - Danh sách nhân viên
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  /**
   * Thêm một nhân viên mới
   * @param employee - Dữ liệu nhân viên cần thêm
   * @returns Observable<Employee> - Nhân viên vừa được thêm
   */
  addEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Employee>(this.apiUrl, employee, { headers });
  }

  /**
   * Lấy chi tiết một nhân viên theo ID
   * @param id - ID của nhân viên
   * @returns Observable<Employee> - Thông tin nhân viên
   */
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  /**
   * Cập nhật thông tin một nhân viên
   * @param id - ID của nhân viên
   * @param employee - Dữ liệu nhân viên cần cập nhật
   * @returns Observable<Employee> - Nhân viên đã được cập nhật
   */
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee, { headers });
  }

  /**
   * Xóa một nhân viên theo ID
   * @param id - ID của nhân viên
   * @returns Observable<void> - Kết quả xóa
   */
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
