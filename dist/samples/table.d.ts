/// <reference types="datatables.net" />
/// <reference types="datatables.net-buttons" />
/// <reference types="datatables.net-fixedheader" />
/// <reference types="datatables.net-select" />
interface ISampleModel {
    Id: number;
    Line: number;
    Type: string;
    Database: string;
    User: string;
    Address: string;
    IsDeleted: boolean;
}
declare function createSampleData(rows: any): ISampleModel[];
declare function createBtn(config: any): string;
declare const dtConfig: DataTables.Settings;
declare function testDataTableRaw(id: string): void;
declare function testDataTableHelper(id: string): void;
