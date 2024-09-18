using Dapper;
using DeviceWebApplication.data;
using DeviceWebApplication.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace DeviceWebApplication.Controllers
{
    public class DeviceController : Controller
    {
        //private readonly ApplicationDb appdb;

        //public DeviceController(ApplicationDb appdb)
        //{
        //    this.appdb = appdb;
        //}


        private readonly string _connectionString;

        public DeviceController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("appconn");
        }



        public IActionResult Index()
        {
            return View();
        }



        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
                try
                {

                var connection = new SqlConnection(_connectionString);

                    await connection.OpenAsync();
                    var query = "SELECT * FROM Device";
                    var products = await connection.QueryAsync<Device>(query);

                    if (products == null || !products.Any())
                    {
                        // No data found
                        return Json(new { error = "No products found" });
                    }

                    return Json(products);
                }
                catch (Exception ex)
                {
                    return Json(new { error = ex.Message });
                }
            }
        
        [HttpGet]
        public async Task<IActionResult> getDeviceById(int? id)
        {
                try
                {

                var connection = new SqlConnection(_connectionString);

                    await connection.OpenAsync();
                    var query = "SELECT * FROM Device where id = "+ id +" ";
                    var products = await connection.QueryAsync<Device>(query);

                    if (products == null || !products.Any())
                    {
                        return Json(new { error = "No products found" });
                    }

                    return Json(products);
                }
                catch (Exception ex)
                {
                    return Json(new { error = ex.Message });
                }
            }

        [HttpPost]
        public IActionResult AddDevice(Device user)
        {
            string sqlQuery = "INSERT INTO Device (Product,Price, Description,Created) VALUES (@Product,@Price, @Description, @Created)";

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                user.Created = DateTime.Now;  
                var result = connection.Execute(sqlQuery, new { Product = user.Product, Price= user.Price,Description = user.Description, Created = user.Created });

                if (result > 0)
                {
                    return Json("Success");
                }
                else
                {
                    return Json("Error");
                }
            }
        }


        [HttpPost]
        public IActionResult DeleteRecord(int? id)
        {
            if (id == null)
            {
                return Json(new { status = "Error", message = "Invalid ID" });
            }

            string sqlQuery = "DELETE FROM Device WHERE Id = @Id";

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                var result = connection.Execute(sqlQuery, new { Id = id });

                if (result > 0)
                {
                    return Json(new { status = "Success" });
                }
                else
                {
                    return Json(new { status = "Error", message = "No record found with this ID" });
                }
            }
        }

        [HttpPost]
        public IActionResult UpdateDevice(Device user)
        {
            string sqlQuery = "UPDATE Device SET Product = @Product,Price =@Price, Description = @Description WHERE Id = @Id";

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                var result = connection.Execute(sqlQuery, new { Product = user.Product, Price = user.Price, Description = user.Description, Id = user.id });

                if (result > 0)
                {
                    return Json(new { status = "Success" });
                }
                else
                {
                    return Json(new { status = "Error" });
                }
            }
        }
    
    
    }
}

