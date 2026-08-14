using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml.Linq;

namespace Employee_Management_ADO_CRUD_SP
{
    public class Program
    {
        static string con = "server=ACU-HYD-LT-1929; Database = DemoDB; Integrated Security = true";
        static SqlConnection cn = new SqlConnection(con);
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to Employee Management System using ADO .Net CRUD Operation(SP)");
            while (true)
            {
                Console.WriteLine("Enter your choice");
                Console.WriteLine("1. Display All Employees ");
                Console.WriteLine("2. Display Employee Info By Id ");
                Console.WriteLine("3. Add new Employee");
                Console.WriteLine("4. Update Employee salary ");
                Console.WriteLine("5. Delete an Employee");
                Console.WriteLine("6. Exit");
                int choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        Console.WriteLine("case 1");
                        DisplayAllEmployee();
                        break;
                    case 2:
                        Console.WriteLine("case 2");
                        Console.WriteLine("Enter Employee id:");
                        int id = Convert.ToInt32(Console.ReadLine());
                        DisplayEmpWithId(id);
                        break;
                    case 3:
                        Console.WriteLine("case 3");
                        Console.WriteLine("Enter name of Employee");
                        string name = Console.ReadLine();
                        Console.WriteLine("Enter department of Employee");
                        string department = Console.ReadLine();
                        Console.WriteLine("Enter salary of Employee");
                        decimal salary = Convert.ToDecimal(Console.ReadLine());
                        AddNewEmployee(name, department, salary);
                        break;
                    case 4:
                        Console.WriteLine("case 4");
                        Console.WriteLine("Enter Employee id:");
                        int id2 = Convert.ToInt32(Console.ReadLine());
                        Console.WriteLine("Enter salary of Employee");
                        decimal salary2 = Convert.ToDecimal(Console.ReadLine());
                        UpdateEmployeeSalary(id2, salary2);
                        break;
                    case 5:
                        Console.WriteLine("case 5");
                        Console.WriteLine("Enter Employee id:");
                        int id3 = Convert.ToInt32(Console.ReadLine());
                        DeleteEmployee(id3);
                        break;
                    case 6:
                        Console.WriteLine("Exiting");
                        return;

                    default:
                        Console.WriteLine("Invalid choice");
                        break;
                }

            }
        }

        private static void DisplayAllEmployee()
        {
            try
            {
                cn.Open();
                SqlCommand cmd = new SqlCommand("sp_GetAllEmployees", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read()) {
                    Console.WriteLine("Id: " + dr["EmpId"] + " Name: " + dr["EmpName"] + ", Department: " + dr["Department"] + ", Salary: " + dr["Salary"]);
                }
                dr.Close();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Something went wrong: " + ex.Message);
            }
            finally
            {
                cn.Close();
            }
        }

        private static void DisplayEmpWithId(int id)
        {
            try
            {
                cn.Open();
                SqlCommand cmd = new SqlCommand("sp_GetEmployeeById", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EmpId", id);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Console.WriteLine("Id: " + dr["EmpId"] + " Name: " + dr["EmpName"] + ", Department: " + dr["Department"] + ", Salary: " + dr["Salary"]);
                }
                dr.Close();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Something went wrong: " + ex.Message);
            }
            finally
            {
                cn.Close();
            }
        }

        private static void AddNewEmployee(string name, string department, decimal salary)
        {
            try
            {
                cn.Open();
                SqlCommand cmd = new SqlCommand("sp_AddEmployee", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EmpName", name);
                cmd.Parameters.AddWithValue("@Department", department);
                cmd.Parameters.AddWithValue("@Salary", salary);
                int res = cmd.ExecuteNonQuery();
                if(res == 1)
                {
                    Console.WriteLine("Employee Inserted Successfully");
                }
                else
                {
                    Console.WriteLine("Unable to insert Employee");
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Something went wrong: " + ex.Message);
            }
            finally
            {
                cn.Close();
            }
        }

        private static void UpdateEmployeeSalary(int id, decimal salary)
        {
            try
            {
                cn.Open();
                SqlCommand cmd = new SqlCommand("sp_UpdateEmployeeSalary", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EmpId", id);
                cmd.Parameters.AddWithValue("@Salary", salary);
                int res = cmd.ExecuteNonQuery();
                if (res == 1)
                {
                    Console.WriteLine("Employee Salary updated Successfully.");
                }
                else
                {
                    Console.WriteLine("Unable to Update Salary.");
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Something went wrong: " + ex.Message);
            }
            finally
            {
                cn.Close();
            }
        }

        private static void DeleteEmployee(int id)
        {
            try
            {
                cn.Open();
                SqlCommand cmd = new SqlCommand("sp_DeleteEmployee", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EmpId", id);
                int res = cmd.ExecuteNonQuery();
                if (res == 1)
                {
                    Console.WriteLine("Employee Deleted Successfully.");
                }
                else
                {
                    Console.WriteLine("Unable to Delete Employee.");
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Something went wrong: " + ex.Message);
            }
            finally
            {
                cn.Close();
            }
        }
    
    
    }
}
