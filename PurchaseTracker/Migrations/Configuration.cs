namespace PurchaseTracker.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using PurchaseTracker.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<PurchaseTracker.Entity.PurchaseTrackerContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(PurchaseTracker.Entity.PurchaseTrackerContext context)
        {
            context.Categories.AddOrUpdate(c => c.Name,
                    new Category() {Name = "Trasfer"},
                    new Category() {Name = "Auto" },
                    new Category() {Name = "Housing"},
                    new Category() {Name = "Entertainment" }
                );
            context.SaveChanges();

            var autoCategory = context.Categories.FirstOrDefault(c => c.Name == "Auto");

            context.Purchases.AddOrUpdate(p => p.Id,
                    new Purchase()
                    {
                        Category = autoCategory,
                        CategoryId = autoCategory.Id,
                        Amount = 12.31,
                        Date = DateTime.Today.AddDays(-14),
                        Payee = "City of New York"
                    },
                    new Purchase()
                    {
                        Category = autoCategory,
                        CategoryId = autoCategory.Id,
                        Amount = 422.11,
                        Date = DateTime.Today,
                        Payee = "City of Los Angeles"
                    },
                    new Purchase()
                    {
                        Category = autoCategory,
                        CategoryId = autoCategory.Id,
                        Amount = 98.01,
                        Date = DateTime.Today.AddDays(-20),
                        Payee = "City of Los London"
                    }
                );
        }
    }
}
