#lang "js";
import { * } from "../../macros/stxcase.js";

let (number?) = macro {
    rule { ($cond ...) } => {
        typeof ($cond ...) === 'number'
    }
}

macro (string?) {
    rule { ($cond ...) } => {
        typeof ($cond ...) === 'string'
    }
}

export {
    (string?),
    (number?)
}
