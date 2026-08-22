using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyWoServer.Models;

namespace MyWoServer.Data.Configurations;

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(p => p.Description)
            .HasMaxLength(500);

        builder.HasQueryFilter("SoftDelete", p => p.DeletedAt == null);

        builder.HasOne(p => p.Area)
            .WithMany(a => a.Projects)
            .HasForeignKey(p => p.AreaId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
