using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicineTracker.Models
{
        public class MedicineDatabaseSettings : IMedicineDatabaseSettings
        {
            public string MedicineCollectionName { get; set; }
            public string ConnectionString { get; set; }
            public string DatabaseName { get; set; }
        }

        public interface IMedicineDatabaseSettings
        {
            string MedicineCollectionName { get; set; }
            string ConnectionString { get; set; }
            string DatabaseName { get; set; }
        }
}
