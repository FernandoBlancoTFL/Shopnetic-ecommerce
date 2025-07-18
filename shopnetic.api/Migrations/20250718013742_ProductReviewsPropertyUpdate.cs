using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace shopnetic.api.Migrations
{
    /// <inheritdoc />
    public partial class ProductReviewsPropertyUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "reviewerEmail",
                table: "Reviews",
                newName: "ReviewerEmail");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReviewerEmail",
                table: "Reviews",
                newName: "reviewerEmail");
        }
    }
}
