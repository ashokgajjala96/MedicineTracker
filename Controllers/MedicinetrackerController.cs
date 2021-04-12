using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicineTracker.Models;
using MedicineTracker.Services;
using Newtonsoft.Json;

namespace MedicineTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicinetrackerController : Controller
    {
        private readonly MedicineService _medicineService;

        public MedicinetrackerController(MedicineService medicineService)
        {
            _medicineService = medicineService;
        }

        [HttpPost]
        [Route("CreateMedicine")]
        public IActionResult CreateMedicine([FromBody] Models.Medicine reqMedicineInfo)
        {
            //var medicineInfo = JsonConvert.DeserializeObject<Models.Medicine>(reqMedicineInfo.ToString());
            _medicineService.CreateMedicine(reqMedicineInfo);

            return Ok();
        }

        [HttpGet]
        [Route("GetMedicineList")]
        public List<Models.Medicine> GetMedicineList()
        {
            return _medicineService.GetMedicineList();
        }

        [HttpGet]
        [Route("GetMedicine")]
        public Models.Medicine GetMedicine([FromQuery] string medicineId)
        {
            return _medicineService.GetMedicine(medicineId);
        }

        [HttpPut]
        [Route("UpdateMedicine")]
        public IActionResult UpdateMedicine([FromQuery] string medicineId, [FromBody] Models.Medicine medicineInfo)
        {
            //var medicineInfo = JsonConvert.DeserializeObject<Models.Medicine>(reqMedicineInfo.ToString());
            _medicineService.UpdateMedicine(medicineId, medicineInfo);

            return Ok();
        }

    }
}
