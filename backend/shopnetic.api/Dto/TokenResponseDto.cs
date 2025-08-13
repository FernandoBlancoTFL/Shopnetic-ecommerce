using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using shopnetic.api.Models;

namespace shopnetic.api.Dto
{
    public class TokenResponseDto
    {
        public required string AccessToken { get; set; }
        public required string RefreshToken { get; set; }
        public required User User { get; set; }
    }
}
