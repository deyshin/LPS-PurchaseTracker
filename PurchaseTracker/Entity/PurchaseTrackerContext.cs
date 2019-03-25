using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using PurchaseTracker.Models;

namespace PurchaseTracker.Entity
{
    public class PurchaseTrackerContext : DbContext
    {
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}