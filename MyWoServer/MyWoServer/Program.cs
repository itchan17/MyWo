using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MyWoServer.Data;
using MyWoServer.Data.Seeders;
using MyWoServer.Models;
using MyWoServer.Services.AreaServices;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IAreaService, AreaService>();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Configure database
builder.Services.AddSingleton<SoftDeleteInterceptor>();

builder.Services.AddDbContext<AppDbContext>((sp, options) => {
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
    options.AddInterceptors(sp.GetRequiredService<SoftDeleteInterceptor>());
});

builder.Services
    .AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var userManager = scope.ServiceProvider
        .GetRequiredService<UserManager<User>>();

    await UserSeeder.SeedUsers(userManager);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "MyWo API");
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
