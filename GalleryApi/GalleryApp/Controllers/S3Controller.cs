using Amazon.S3;
using Amazon.S3.Model;
using Gallery.CORE.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Gallery.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class S3Controller : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _BucketName = "albumaws-testpnoren";

        public S3Controller(IAmazonS3 s3Client)
        {
            _s3Client = s3Client;
        }
        // GET: api/<S3Controller>
        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName, [FromQuery] string fileType)
        {
            if (string.IsNullOrWhiteSpace(fileName) || string.IsNullOrWhiteSpace(fileType))
                return BadRequest("fileName and fileType are required");
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _BucketName,
                Key = fileName,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(5),
                ContentType = fileType // או סוג הקובץ המתאים
            };

            string url = _s3Client.GetPreSignedURL(request);
            return Ok(new { url });
        }
        [HttpDelete("by-url/{*fileUrl}")]
        public async Task<IActionResult> DeleteFileByUrl([FromRoute] string fileUrl)

        {
            if (string.IsNullOrWhiteSpace(fileUrl))
                return BadRequest("fileUrl is required");

            try
            {
                // חילוץ ה-Key מה-URL
                var uri = new Uri(fileUrl);
                string key = uri.AbsolutePath.TrimStart('/');

                var request = new DeleteObjectRequest
                {
                    BucketName = _BucketName,
                    Key = key
                };

                var response = await _s3Client.DeleteObjectAsync(request);

                return Ok(new { message = "File deleted successfully", key });
            }
            catch (AmazonS3Exception ex)
            {
                return StatusCode((int)ex.StatusCode, new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

    }
}