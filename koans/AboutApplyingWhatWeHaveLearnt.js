/*jslint nomen: true */
/*global _, describe, beforeEach, it, expect, console*/
/*jslint nomen: false */

describe("About Applying What We Have Learnt", function () {
    "use strict";
    var products;

    beforeEach(function () {
        products = [
            { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
            { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
            { name: "South Of The Border", ingredients: ["black beans", "mushrooms", "jalapenos"], containsNuts: false },
            { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
            { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
        ];
    });

  /*********************************************************************************/

    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

        var i,
            j,
            hasMushrooms,
            productsICanEat = [];

        for (i = 0; i < products.length; i += 1) {
            if (products[i].containsNuts === false) {
                hasMushrooms = false;
                for (j = 0; j < products[i].ingredients.length; j += 1) {
                    if (products[i].ingredients[j] === "mushrooms") {
                        hasMushrooms = true;
                    }
                }
                if (!hasMushrooms) { productsICanEat.push(products[i]); }
            }
        }
        expect(productsICanEat.length).toBe(1);
    });

    /*********************************************************************************/

    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative refactor)", function () {

        var i,
            j,
            pizzasICanEat = [],
            pizzas = products,
            noContainsNuts,
            hasMushroom,
            noHasMushrooms,
            iCanEat;

        noContainsNuts = function (pizza) {
            return (!pizza.containsNuts);
        };

        hasMushroom = function (ingredient) {
            if (ingredient === "mushrooms") { return true; }
        };

        noHasMushrooms = function (pizzaHasMushroom) {
            if (pizzaHasMushroom) { return true; }
            return false;
        };

        iCanEat = function (pizzas) {
            var pizza,
                pizzaHasMushroom,
                ingredients,
                ingredient;

            for (i = 0; i < pizzas.length; i += 1) {
                pizza = pizzas[i];
                ingredients = pizza.ingredients;

                for (j = 0; j < ingredients.length; j += 1) {
                    ingredient = pizza.ingredients[j];
                    pizzaHasMushroom = hasMushroom(ingredient);
                }

                if (noHasMushrooms(pizzaHasMushroom) && noContainsNuts(pizza)) { pizzasICanEat.push(pizzas[i]); }
            }
            return pizzasICanEat;
        };

        pizzasICanEat = iCanEat(pizzas);

        expect(pizzasICanEat.length).toBe(1);
    });

    /*********************************************************************************/

    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (¿imperative?)", function () {

        // for each pizza take ingredients
        // if some ingredient is nuts next pizza
        // is some ingredient is mushrooms next pizza
        // save pizza for eat

        var iCanEat,
            hasIngredientsICantEat,
            hasIngredientICantEat,
            hasNuts,
            productsICanEat = [],
            ingredientICantEat = "mushrooms";

        iCanEat = function (products, ingredientICantEat) {
            productsICanEat = [];
            products.forEach(function (product) {
                var noContainsIngredientsICantEat = false,
                    noContainsNuts = hasNuts(product);

                noContainsIngredientsICantEat = hasIngredientsICantEat(product.ingredients, ingredientICantEat);
                if (noContainsIngredientsICantEat && noContainsNuts) { productsICanEat.push(product); }
            });
            return productsICanEat;
        };

        hasIngredientsICantEat = function (ingredients, ingredientICantEat) {
            var hasSomeIngredientsICantEat = false;

            ingredients.forEach(function (ingredient) {
                if (!hasSomeIngredientsICantEat) {
                    hasSomeIngredientsICantEat = hasIngredientICantEat(ingredient, ingredientICantEat);
                }
            });
            return !hasSomeIngredientsICantEat;
        };

        hasIngredientICantEat =  function (ingredient, ingredientICantEat) {
            return ingredient === ingredientICantEat;
        };

        hasNuts = function (product) {
            return !product.containsNuts;
        };

        expect(iCanEat(products, ingredientICantEat).length).toBe(1);
    });

    /*********************************************************************************/

    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (refactor)", function () {
        /*
        Take each product.
        For each product look for have nuts.
        And also take ingredients.
        For each ingredien look for mushrooms.
        For each product what no contains mushrooms or nuts inventorize it.
        */
        var productsICanEat = [];

        function productContainsSomeICantEat(nuts, mushrooms, product) {
            if (nuts && mushrooms) { productsICanEat.push(product); }
        }
        function lookForMushrooms(ingredient) {
            return !(ingredient === "mushrooms");
        }
        function takeEachIngredient(product) {
            var j, ingredientHate = true;
            for (j = 0; j < product.ingredients.length; j += 1) {
                if (ingredientHate) { ingredientHate = lookForMushrooms(product.ingredients[j]); }
            }
            return ingredientHate;
        }
        function lookForNuts(product) {
            return (product.containsNuts === false);
        }
        function takeEachProduct(products) {
            var i, nuts, mushrooms;
            for (i = 0; i < products.length; i += 1) {
                nuts = lookForNuts(products[i]);
                mushrooms = takeEachIngredient(products[i]);
                productContainsSomeICantEat(nuts, mushrooms, products[i]);
            }
        }
        takeEachProduct(products);

        expect(productsICanEat.length).toBe(1);
    });

    /*********************************************************************************/

    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional) filter() & every() Javascript", function () {

        var productsICanEat = [];

        /* solve using filter() & all() / any() Underscore*/
        /* Solve using filter() & every() Javascript */

        function ingredientICantEat(ingredient) {
            if (ingredient !== "mushrooms") { return true; }
            return false;
        }

        function ingredientsICantEat(product) {
            return product.ingredients.every(ingredientICantEat);
        }

        function productsICantEat(product) {
            if (!product.containsNuts && ingredientsICantEat(product)) { return true; }
            return false;
        }

        productsICanEat = products.filter(productsICantEat);

        expect(productsICanEat.length).toBe(1);
    });

    /*********************************************************************************/

    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional) filter() & some() Javascript", function () {

        var productsICanEat = [];

        /* solve using filter() & all() / any() Underscore*/
        /* Solve using filter() & some() Javascript */

        function ingredientICantEat(ingredient) {
            return (ingredient === "mushrooms");
        }

        function ingredientsICantEat(product) {
            return !product.ingredients.some(ingredientICantEat);
        }

        function productsICantEat(product) {
            return (!product.containsNuts && ingredientsICantEat(product));
        }

        productsICanEat = products.filter(productsICantEat);

        expect(productsICanEat.length).toBe(1);
    });

    /*********************************************************************************/

    it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

        var sum = 0,
            i;

        for (i = 1; i < 1000; i += 1) {
            if (i % 3 === 0 || i % 5 === 0) {
                sum += i;
            }
        }

        expect(sum).toBe(233168);
    });

    /*********************************************************************************/

    it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative) refactor", function () {

        var sum = 0,
            i;
        /*
        Take each number between 1 to 1000.
        For each number look if multiple of 3 or 5.
        If multiple, sum it to a accumulator.
        */
        function sumIt(number) {
            sum += number;
        }

        function lookForMultiple(number) {
            if (number % 3 === 0 || number % 5 === 0) { sumIt(number); }
        }

        function takeEachNumber() {
            for (i = 1; i < 1000; i += 1) {
                lookForMultiple(i);
            }
        }

        function sumMultiple() {
            takeEachNumber();
        }

        sumMultiple();

        expect(sum).toBe(233168);
    });

    it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative) module pattern", function () {

        var myKoans = (function () {
            var sum = 0,
                i;
            /*
            Take each number between 1 to 1000.
            For each number look if multiple of 3 or 5.
            If multiple, sum it to a accumulator.
            */
            function sumIt(number) {
                sum += number;
            }

            function lookForMultiple(number) {
                if (number % 3 === 0 || number % 5 === 0) { return sumIt(number); }
            }

            function takeEachNumber() {
                for (i = 1; i < 1000; i += 1) {
                    lookForMultiple(i);
                }
            }
            return {
                sumMultiple: function () {
                    takeEachNumber();
                    return sum;
                }
            };
        }()),

            sum = myKoans.sumMultiple();

        expect(sum).toBe(233168);
    });

    it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

        /* try chaining range() and reduce() */
        /*jslint nomen: true */
        var sum = _.range(1, 1000, 1).
                    reduce(function (memo, num) {
                    if (num % 3 === 0 || num % 5 === 0) {
                        return memo + num;
                    }
                    return memo;
                }, 0);
        /*jslint nomen: false */
        expect(233168).toBe(sum);
    });

    /*********************************************************************************/

    it("should count the ingredient occurrence (imperative)", function () {
        var ingredientCount = { "{ingredient name}": 0 },
            i,
            j;

        for (i = 0; i < products.length; i += 1) {
            for (j = 0; j < products[i].ingredients.length; j += 1) {
                ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
            }
        }

        expect(ingredientCount.mushrooms).toBe(2);
    });

    it("should count the ingredient occurrence (imperative) refactor", function () {
        var ingredientCount = { "{ingredient name}": 0 },
            i,
            j;
        /*
        Take each product.
        For each product take ingredients.
        For each ingredient inventarize it.
        */
        function inventorizeIngredient(ingredient) {
            ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
        }

        function takeEachIngredient(product) {
            for (j = 0; j < product.ingredients.length; j += 1) {
                inventorizeIngredient(product.ingredients[j]);
            }
        }

        function takeEachProduct(products) {
            for (i = 0; i < products.length; i += 1) {
                takeEachIngredient(products[i]);
            }
        }

        function countIngredients(products) {
            takeEachProduct(products);
        }

        countIngredients(products);

        expect(ingredientCount.mushrooms).toBe(2);
    });

    it("should count the ingredient occurrence (functional)", function () {
        var ingredientCount = { "{ingredient name}": 0 };

        /* chain() together map(), flatten() and reduce() */
        /*jslint nomen: true */
        ingredientCount = _(products).chain().
                            map(function (product) { return product.ingredients; }).
                            flatten().
                            reduce(function (ingredients, index) { ingredients[index] = (ingredients[index] || 0) + 1; return ingredients; }, {}).
                            value();
        /*jslint nomen: false */
        expect(ingredientCount['sundried tomatoes']).toBe(2);
    });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /*
  it("should find the largest prime factor of a composite number", function () {

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {


  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });

  it("should find the 10001st prime", function () {

  });
  */
});
