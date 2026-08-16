using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyWoServer.Migrations
{
    /// <inheritdoc />
    public partial class AddDeletedAtField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "Areas",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "Areas");
        }
    }
}
