const EIngredient = {
    breadTop: "bread-top",
    breadBottom: "bread-bottom",
    cheese:"cheese",
    meat: "meat",
    bacon: "bacon",
    salad: "salad",
    properties: {
        "bread-top": {price: 2.0},
        "bread-bottom": {price: 2.0},
        "cheese": {price: 0.4},
        "meat": {price: 1.3},
        "bacon": {price: 0.7},
        "salad": {price: 0.5},
    }
}

Object.freeze(EIngredient);

export default EIngredient;