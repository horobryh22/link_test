export interface CarCharacteristics {
    car_id: string;
    brand: string;
    model: string;
    productionYear: string;
    body: string;
    mileage: string;
}

export interface Car {
    id: string;
    images: string;
    name: string;
    description: string;
    price: string;
    contacts: string;
    technical_characteristics?: CarCharacteristics;
    options?: Record<string, string>[];
}
