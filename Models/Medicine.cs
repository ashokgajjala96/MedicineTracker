using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MedicineTracker.Models
{
    public class Medicine
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Brand { get; set; }

        public decimal Price { get; set; }
        public int Quantity {get; set;}
        public DateTime ExpDate { get; set; }
        public string Notes { get; set; }
    }
}
