export class City {
    constructor(data) {
        this.Description = data.Description,
        this.DescriptionRu = data.DescriptionRu,
        this.Ref = data.Ref,
        this.Area = data.Area,
        this.SettlementType = data.SettlementType,
        this.IsBranch = data.IsBranch,
        this.PreventEntryNewStreetsUser = data.PreventEntryNewStreetsUser,
        this.CityID = data.CityID,
        this.SettlementTypeDescriptionRu = data.SettlementTypeDescriptionRu,
        this.SettlementTypeDescription = data.SettlementTypeDescription,
        this.SpecialCashCheck = data.SpecialCashCheck
    }
}

// {
//     "data"
// :
//     [{
//         "Description": "Київ",
//         "DescriptionRu": "Киев",
//         "Ref": "8d5a980d-391c-11dd-90d9-001a92567626",
//         "Delivery1": "1",
//         "Delivery2": "1",
//         "Delivery3": "1",
//         "Delivery4": "1",
//         "Delivery5": "1",
//         "Delivery6": "1",
//         "Delivery7": "0",
//         "Area": "71508131-9b87-11de-822f-000c2965ae0e",
//         "SettlementType": "563ced10-f210-11e3-8c4a-0050568002cf",
//         "IsBranch": "1",
//         "PreventEntryNewStreetsUser": null,
//         "Conglomerates": ["d4771ed0-4fb7-11e4-91b8-2f592fe1dcac", "f86b75e9-42f4-11e4-91b8-2f592fe1dcac", "f86b75e9-42f4-11e4-91b8-2f592fe1dcac", "f86b75e9-42f4-11e4-91b8-2f592fe1dcac", "f86b75e9-42f4-11e4-91b8-2f592fe1dcac", "f86b75e9-42f4-11e4-91b8-2f592fe1dcac", "f86b75e9-42f4-11e4-91b8-2f592fe1dcac", "f86b75e9-42f4-11e4-91b8-2f592fe1dcac"],
//         "CityID": "4",
//         "SettlementTypeDescriptionRu": "город",
//         "SettlementTypeDescription": "місто",
//         "SpecialCashCheck": 1
//     }]
// }