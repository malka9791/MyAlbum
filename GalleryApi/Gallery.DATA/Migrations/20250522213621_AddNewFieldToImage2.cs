using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gallery.DATA.Migrations
{
    /// <inheritdoc />
    public partial class AddNewFieldToImage2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Emotions",
                table: "Images",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Emotions",
                table: "Images");
        }
    }
}
