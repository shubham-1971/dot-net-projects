using Delhivery.API.Services;
using Delhivery.Data.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//  Get connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

//  Register Repository
builder.Services.AddScoped<IShipmentRepository>(sp =>
    new ShipmentRepository(connectionString));

//  Register Service
builder.Services.AddScoped<IShipmentService, ShipmentService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy

            .AllowAnyOrigin()

            .AllowAnyHeader()

            .AllowAnyMethod();
        });
});
// ✅ CORS
//builder.Services.AddCors(options =>
//{

//    options.AddPolicy("All",

//        policy => policy.AllowAnyOrigin()

//                        .AllowAnyMethod()

//                        .AllowAnyHeader());

//});


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAll");
//app.UseCors("All");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
