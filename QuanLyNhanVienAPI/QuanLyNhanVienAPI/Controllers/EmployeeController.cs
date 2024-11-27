using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuanLyNhanVienAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        // Danh sách nhân viên giả lập (in-memory)
        private static readonly List<Employee> Employees = new()
        {
            new Employee { Id = 1, Name = "Nguyễn Văn A", Gender = "Nam", Birthdate = new DateTime(1990, 1, 1), Email = "nguyenvana@example.com", Position = "Manager", StartDate = new DateTime(2018, 5, 1) },
            new Employee { Id = 2, Name = "Trần Thị B", Gender = "Nữ", Birthdate = new DateTime(1992, 2, 2), Email = "tranthib@example.com", Position = "Developer", StartDate = new DateTime(2019, 6, 15) },
            new Employee { Id = 3, Name = "Phạm Văn C", Gender = "Nam", Birthdate = new DateTime(1994, 3, 3), Email = "phamvanc@example.com", Position = "Designer", StartDate = new DateTime(2020, 7, 20) }
        };

        // Lấy danh sách nhân viên
        [HttpGet]
        public IActionResult GetEmployees()
        {
            return Ok(Employees);
        }

        // Thêm mới nhân viên
        [HttpPost]
        public IActionResult AddEmployee([FromBody] Employee newEmployee)
        {
            // Kiểm tra dữ liệu đầu vào
            if (newEmployee == null)
            {
                return BadRequest("Thông tin nhân viên không hợp lệ.");
            }

            if (string.IsNullOrEmpty(newEmployee.Name) ||
                string.IsNullOrEmpty(newEmployee.Email) ||
                string.IsNullOrEmpty(newEmployee.Position))
            {
                return BadRequest("Tên, Email, và Vị trí là các trường bắt buộc.");
            }

            // Kiểm tra email đã tồn tại chưa
            if (Employees.Any(e => e.Email == newEmployee.Email))
            {
                return Conflict($"Email '{newEmployee.Email}' đã tồn tại.");
            }

            // Tạo Id tự động cho nhân viên mới
            newEmployee.Id = Employees.Any() ? Employees.Max(e => e.Id) + 1 : 1;

            // Thêm vào danh sách
            Employees.Add(newEmployee);

            // Trả về thông tin nhân viên vừa thêm
            return CreatedAtAction(nameof(GetEmployees), new { id = newEmployee.Id }, newEmployee);
        }
    }

    // Model Employee
    public class Employee
    {
        public int Id { get; set; } // Mã nhân viên (tự động tăng)
        public string Name { get; set; } // Tên nhân viên
        public string Gender { get; set; } // Giới tính
        public DateTime Birthdate { get; set; } // Ngày sinh
        public string Email { get; set; } // Email
        public string Position { get; set; } // Vị trí công việc
        public DateTime StartDate { get; set; } // Ngày bắt đầu làm việc

        public string Shift { get; set; } // Ca làm việc
        public decimal Salary { get; set; } // Lương
    }
}
