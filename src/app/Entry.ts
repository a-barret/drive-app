export class Entry {
    private date: Date;
    private odometer: number;
    private fuelLevel: number;
    private description?: string;

    public constructor(date: Date, odometer: number, fuelLevel: number, description?: string) {
        // Creates the new entry object with the information placed into the contructor
        this.date = date;
        this.odometer = odometer;
        this.fuelLevel = fuelLevel;
        this.description = description;
    }

    public display(): string {
        // Checks if there is a description with the entry and will return a string with it if there is and without it if there is not
        if (this.description != null && this.description != "")
            return `Date: ${this.date.toLocaleDateString()}, Odometer: ${this.odometer}, Fuel Level: ${this.fuelLevel} gal, Description: ${this.description}`;
        return `Date: ${this.date.toLocaleDateString()}, Odometer: ${this.odometer}, Fuel Level: ${this.fuelLevel} gal`;
    }

    public getOdometer(): number {
        // Returns the odometer reading of the entry
        return this.odometer;
    }

    public getFuelLevel(): number {
        // Returns the fuel level of the entry
        return this.fuelLevel;
    }
}