using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace shopnetic.api.Migrations
{
    /// <inheritdoc />
    public partial class ProductWeightWithCapitalLetter : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "weight",
                table: "Products",
                newName: "Weight");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Weight",
                table: "Products",
                newName: "weight");
        }
    }
}
