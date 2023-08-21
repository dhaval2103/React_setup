import { AsYouType } from "libphonenumber-js";


function phoneFormate(number){
    return new AsYouType('US').input(number)
}

export {
    phoneFormate
  }