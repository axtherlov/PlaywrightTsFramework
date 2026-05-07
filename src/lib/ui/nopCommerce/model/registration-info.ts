export interface RegistrationInfo {
    gender: "Male" | "Female";
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    companyName?: string;
    newsletter?: boolean;
}
