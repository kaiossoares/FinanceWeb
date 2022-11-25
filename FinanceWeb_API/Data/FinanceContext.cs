using Microsoft.EntityFrameworkCore;
using FinanceWeb_API.Models;
using System.Diagnostics.CodeAnalysis;

namespace FinanceWeb_API.Data
{
    public class FinanceContext : DbContext
    {
        protected readonly IConfiguration Configuration;
        public FinanceContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(Configuration.GetConnectionString("StringConexaoSQLServer"));
        }

        public DbSet<Ganho> Ganho { get; set; }
    }
}