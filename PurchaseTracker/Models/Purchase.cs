using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using PurchaseTracker.Util;

namespace PurchaseTracker.Models
{
    public class Purchase
    {
        [Key]
        public int Id { get; set; }
        
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set;}

        [Required]
        [JsonConverter(typeof(DateFormatConverter), "yyyy-MM-dd")]
        public DateTime Date { get; set; }
        [Required]
        public string Payee { get; set; }
        [Required]
        public double Amount { get; set; }
        public string Memo { get; set; }
    }
}