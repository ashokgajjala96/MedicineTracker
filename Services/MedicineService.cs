using System.Collections.Generic;
using System.Linq;
using MedicineTracker.Models;
using MongoDB.Driver;


namespace MedicineTracker.Services
{
    public class MedicineService
    {
        private readonly IMongoCollection<Models.Medicine> _medicines;

        public MedicineService(IMedicineDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _medicines = database.GetCollection<Models.Medicine>(settings.MedicineCollectionName);
        }

        public List<Models.Medicine> GetMedicineList() =>
            _medicines.Find(book => true).ToList();

        public Models.Medicine GetMedicine(string id) =>
            _medicines.Find<Models.Medicine>(book => book.Id == id).FirstOrDefault();

        public Models.Medicine CreateMedicine(Models.Medicine book)
        {
            _medicines.InsertOne(book);
            return book;
        }

        public void UpdateMedicine(string id, Models.Medicine updateMedicine)
        {
            _medicines.ReplaceOne(medicine => medicine.Id == id, updateMedicine);
        }
    
    }
}
