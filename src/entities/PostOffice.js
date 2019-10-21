export class PostOffice {
    constructor(data){
        this.SiteKey = data.SiteKey;
        this.Description = data.Description;
        this.DescriptionRu = data.DescriptionRu;
        this.ShortAddress = data.ShortAddress;
        this.ShortAddressRu = data.ShortAddressRu;
        this.Phone = data.Phone;
        this.Number = data.Number;
        this.CityDescription = data.CityDescription;
        this.CityDescriptionRu = data.CityDescriptionRu;
        this.Longitude = data.Longitude;
        this.Latitude = data.Latitude;
        this.CityRef = data.CityRef;
        this.Ref = data.Ref;

    }
}

//{
//             "SiteKey": "105",
//             "Description": "Відділення №1: вул. Пирогівський шлях, 135",
//             "DescriptionRu": "Отделение №1: ул. Пироговский путь, 135",
//             "ShortAddress": "Київ, Пирогівський шлях, 135",
//             "ShortAddressRu": "Киев, Пироговский путь, 135",
//             "Phone": "380800500609",
//             "TypeOfWarehouse": "9a68df70-0267-42a8-bb5c-37f427e36ee4",
//             "Ref": "1ec09d88-e1c2-11e3-8c4a-0050568002cf",
//             "Number": "1",
//             "CityRef": "8d5a980d-391c-11dd-90d9-001a92567626",
//             "CityDescription": "Київ",
//             "CityDescriptionRu": "Киев",
//             "Longitude": "30.542884000000000",
//             "Latitude": "50.354786000000000",
//             "PostFinance": "1",
//             "BicycleParking": "1",
//             "PaymentAccess": "1",
//             "POSTerminal": "1",
//             "InternationalShipping": "1",
//             "TotalMaxWeightAllowed": 0,
//             "PlaceMaxWeightAllowed": "1100",
//             "Reception": {
//                 "Monday": "08:00-22:00",
//                 "Tuesday": "08:00-22:00",
//                 "Wednesday": "08:00-22:00",
//                 "Thursday": "08:00-22:00",
//                 "Friday": "08:00-22:00",
//                 "Saturday": "08:00-19:00",
//                 "Sunday": "09:00-18:00"
//             },
//             "Delivery": {
//                 "Monday": "08:00-18:00",
//                 "Tuesday": "08:00-18:00",
//                 "Wednesday": "08:00-18:00",
//                 "Thursday": "08:00-18:00",
//                 "Friday": "08:00-18:00",
//                 "Saturday": "08:00-18:00",
//                 "Sunday": "09:00-16:00"
//             },
//             "Schedule": {
//                 "Monday": "08:00-22:00",
//                 "Tuesday": "08:00-22:00",
//                 "Wednesday": "08:00-22:00",
//                 "Thursday": "08:00-22:00",
//                 "Friday": "08:00-22:00",
//                 "Saturday": "08:00-19:00",
//                 "Sunday": "09:00-18:00"
//             },
//             "DistrictCode": "2с1Д3",
//             "WarehouseStatus": "Working",
//             "CategoryOfWarehouse": "Branch"
//         }