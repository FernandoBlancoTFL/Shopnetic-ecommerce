using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace shopnetic.api.Migrations
{
    /// <inheritdoc />
    public partial class RenameProductoProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Categoty",
                table: "Products",
                newName: "Category");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Category",
                table: "Products",
                newName: "Categoty");
        }
    }
}
