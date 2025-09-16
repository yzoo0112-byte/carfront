export type Car = {
    id?: number;
    brand: string;
    model: string;
    color: string;
    registrationNumber: string;
    modelYear: number;
    price: number;
}//type : interface처럼 중복 선언 불가, 생략 불가능 (const같은 문법)


export type User = {
    username: string;
    password: string;
}
