using Amazon.S3;
using Amazon.S3.Model;
using Gallery.CORE.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Gallery.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        
    }
}