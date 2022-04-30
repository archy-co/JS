/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        //await wait(actualCookingTime);
        await wait(0);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

/*
    YOUR CODE HERE
*/

class Kitchen {
    constructor() {
        this.fridge = [];
        this.orders = [];
    }

    addToFridge(ingridients) {
        ingridients.forEach(ingridient => {
            this.fridge.push(ingridient);
        });
    }

    order(dish) {
        // check if the order can be taken
        let coockable = true;
        dish.ingridients.forEach(ingridient => {
            let isInFridge = false;
            this.fridge.forEach(fridgeIngridient => {
                if (ingridient.name === fridgeIngridient.name) {
                    if (ingridient.amount > fridgeIngridient.amount) {
                        coockable = false;
                        return;
                    }
                    isInFridge = true;
                }
            });
            if (!isInFridge) {
                coockable = false;
                return;
            }
        });

        // if the order can be taken, reserve ingridients for it
        // and add it to the array of orders
        if (coockable) {
            dish.ingridients.forEach(ingridient => {
                this.fridge.forEach(fridgeIngridient => {
                    if (ingridient.name === fridgeIngridient.name) {
                        fridgeIngridient.amount -= ingridient.amount;
                        if (fridgeIngridient.amount === 0) {
                            this.fridge.splice(this.fridge.indexOf(fridgeIngridient), 1);
                        }
                        return;
                    }
                });
            });
            this.orders.push(dish);
        }
        else {
            throw new Error('Not enough ingridients in fridge');
        }
    }

    async cookFastestOrder() {
        // determine fastest order
        let fastestDish = this.orders[0];
        for (let i = 1; i < this.orders.length; i++) {
            const currentDish = this.orders[i];
            if (currentDish.cookingTime < fastestDish.cookingTime) {
                fastestDish = currentDish;
            }
        }

        await fastestDish.cook();
        this.orders.splice(this.orders.indexOf(fastestDish), 1);

        return fastestDish;
    }

    async cookAllOrders() {
        let cookedDishes = [];
        while (this.orders.length > 0) {
            const currentDish = await this.cookFastestOrder();
            cookedDishes.push(currentDish);
        }

        return cookedDishes;
    }
}

class Ingridient {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
}

class Bolognese extends Dish {
    constructor() {
        super(10);
        this.ingridients = [
            new Ingridient('spaghetti', 1),
            new Ingridient('tomato', 1)
        ]

    }
}

class MashedPotatoes extends Dish {
    constructor() {
        super(8);
        this.ingridients = [
            new Ingridient('potato', 1)
        ]
    }
}

class Steak extends Dish {
    constructor() {
        super(7);
        this.ingridients = [
            new Ingridient('meat', 1)
        ]
    }
}

class SteakAndFries extends Dish {
    constructor() {
        super(5);
        this.ingridients = [
            new Ingridient('meat', 1),
            new Ingridient('potato', 1)
        ]
    }
}

async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    await kitchen.cookFastestOrder(); // Returns fastest dish to make
    await kitchen.cookAllOrders(); // Returns two dishes in array

    kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
}

test();
