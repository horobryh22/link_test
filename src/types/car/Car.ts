interface CarCharacteristics {
    'car_id': number,
    'brand': string,
    'model': string,
    'productionYear': number,
    'body': string,
    'mileage': number
}

export interface Car {
    'id': number,
    'images': string[],
    'name': string,
    'description': string,
    'price': number,
    'contacts': string,
    'technical_characteristics': CarCharacteristics,
    'options': Record<string, string>[]
}
