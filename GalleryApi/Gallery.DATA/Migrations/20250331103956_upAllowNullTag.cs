using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gallery.DATA.Migrations
{
    /// <inheritdoc />
    public partial class upAllowNullTag : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Tags_TagId",
                table: "Images");

            migrationBuilder.AlterColumn<int>(
                name: "TagId",
                table: "Images",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Tags_TagId",
                table: "Images",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Tags_TagId",
                table: "Images");

            migrationBuilder.AlterColumn<int>(
                name: "TagId",
                table: "Images",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Tags_TagId",
                table: "Images",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
