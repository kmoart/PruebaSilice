export interface Product{

    id: string,
    name: string,
    description?: string,
    price: number;
    publisher: Publisher;
    alt_img?:  string;
}

export enum Publisher{
  DCComics = "DC Comics",
  MarvelComics = "Marvel Comics"
}


