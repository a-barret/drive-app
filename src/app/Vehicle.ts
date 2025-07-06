import { Entry } from "./Entry";

export class Vehicle {
    private static nextId = 1; // Static variable to keep track of the next ID
    private id: number;
    private year: number;
    private make: string;
    private model: string;
    private logbook: Entry[]

    public constructor(year: number, make: string, model: string, currentOdometer: number, currentFuelLevel: number) {
        this.id = Vehicle.nextId++;
        this.year = year;
        this.make = make;
        this.model = model;
        this.logbook = [];
        this.addEntry(new Date(), currentOdometer, currentFuelLevel, "First entry");
    }

    public display(): string {
    // Constructs and returns a string that has all the vehicle's information for the user
        let logbookString = "";
        // This loop constructs a string with entry from the logbook
        for (const entry of this.logbook) {
            logbookString += "\n" + entry.display()
        }
        return ` --- ${this.year} ${this.make} ${this.model} ---
Odometer: ${this.getRecentOdometer()}
Fuel Level: ${this.getRecentFuelLevel()}

 --- LOGBOOK ---${logbookString}
 ---   END   ---
`
    }

    public getId(): number {
    // Returns the id of the vehicle
        return this.id;
    }

    public getVehicleName(): string {
    // Retrieves the vhicle infomation and returns it as a string
        return `${this.year} ${this.make} ${this.model}`;
    }

    public getLogbook(): Entry[] {
    // Returns the logbook array
        return this.logbook;
    }

    public getRecentOdometer(): number {
    // Gets the most recent entries odometer reading
        return this.logbook[0].getOdometer();
    }

    public getRecentFuelLevel(): number {
    // Gets the most recent entries fuel level
        return this.logbook[0].getFuelLevel();
    }

    public addEntry(date: Date, odometer: number, fuelLevel: number, description?: string): void {
    // Creates a new entry and adds it to the top of the logbook for easy access
        this.logbook.unshift(new Entry(date, odometer, fuelLevel, description))
    }
}