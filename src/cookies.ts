import Cookies from 'js-cookie';
import { UserData } from "./interfaces";

function changeUserData(userData: UserData, dataType: keyof UserData, newValue: UserData[keyof UserData]) {
    userData[dataType] = newValue;
    return userData;
}

export function updateUserData(dataType: keyof UserData, newValue: UserData[keyof UserData]) {
    const userData = Cookies.get('userData');
    if (userData) {
        const newData = changeUserData(JSON.parse(userData), dataType, newValue);
        Cookies.set('userData', JSON.stringify(newData));
    }
}