using BookProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageHowMany = 10, int pageNum = 1)
        {
            var something = _bookContext.Books.ToList()
                .Skip((pageNum-1) * pageHowMany)
                .Take(pageHowMany);

            var totalNumProjects = _bookContext.Books.Count();
            return Ok(new
            {
                Projects = something,
                TotalNumProjects = totalNumProjects
               });
                
        }

        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            var something = _bookContext.Books.Where(p => p.Classification == "Functional").ToList();
            return something;
        }
    }
}
