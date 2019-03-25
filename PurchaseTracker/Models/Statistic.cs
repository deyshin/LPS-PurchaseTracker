using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PurchaseTracker.Models
{
    public class Statistic
    {
        public int Count { get; set; }
        public double Sum { get; set; }

        public Statistic(int count, double sum)
        {

            Count = count;
            Sum = sum;
        }
    }
}