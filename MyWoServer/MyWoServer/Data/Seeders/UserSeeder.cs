using Microsoft.AspNetCore.Identity;
using MyWoServer.Models;

namespace MyWoServer.Data.Seeders;

public static class UserSeeder
{
    public static async Task SeedUsers(UserManager<User> userManager)
    {
        const string email = "test@example.com";

        if (await userManager.FindByEmailAsync(email) == null)
        {
            var user = new User
            {
                Id = "550e8400-e29b-41d4-a716-446655440000",
                UserName = email,
                Email = email,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var result = await userManager.CreateAsync(user, "Password123!");

            if (!result.Succeeded)
            {
                var errors = string.Join(
                    ", ",
                    result.Errors.Select(e => e.Description)
                );

                throw new Exception($"Failed to seed user: {errors}");
            }
        }
    }
    
}
