export type FormElementName =
    'name'
    | 'description'
    | 'price'
    | 'contacts'
    | 'images'
    | 'brand'
    | 'model'
    | 'productionYear'
    | 'body'
    | 'mileage';

export interface FormElement {
    id: string,
    name: FormElementName,
    label: string,
    placeholder: string,
    defaultValue?: string,
}

export type FormValues = Record<string, string> & {
    name: string,
    description: string,
    contacts: string,
    price: string,
    images: string,
    brand: string,
    model: string,
    productionYear: string,
    body: string,
    mileage: string,
}