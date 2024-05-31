const Order = require("./assignment1Order");

const VARSITY_JACKET_PRICE = 425.0;
const FLEECE_JACKET_PRICE = 125.0;
const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  JACKET1: Symbol("jacket1"),
  JACKET2: Symbol("jacket2"),
  SIZE: Symbol("size"),
  SIZE2: Symbol("size2"),
  COLOUR: Symbol("Colour"),
  COLOUR2: Symbol("Colour2"),
  PRICE1: Symbol("Price1"),
  PRICE2: Symbol("Price2"),
  PROTECTOR: Symbol("Protector"),
});

module.exports = class BagsOrder extends Order {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sJacket1 = "";
    this.sJacket2 = "";
    this.sSize1 = "";
    this.sSize2 = "";
    this.sColour1 = "";
    this.sColour2 = "";
    this.sPriceV = 425;
    this.sPriceF = 125;
    this.sPrice1 = 0.0;
    this.sPrice2 = 0.0;
    this.sProtector = "";
    this.sProtectorPrice = 30;
    this.priceBeforeTax = 0.0;
    this.taxRate = 0.13;
    this.tax = 0.0;
    this.totalPrice = 0.0;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.JACKET;
        aReturn.push("Welcome to Conestoga's Jackets.");
        aReturn.push("We have a variety of jackets available.");
        aReturn.push("Which one you love most?");
        aReturn.push(
          `Select option 'a' for Varsity jacket (Price: $${VARSITY_JACKET_PRICE})`
        );
        aReturn.push(
          `Select option 'b' for Fleece jacket (Price: $${FLEECE_JACKET_PRICE})`
        );
        break;
      case OrderState.JACKET:
        this.stateCur = OrderState.SIZE;
        if (sInput.toLowerCase() == "a") {
          this.sJacket1 = "Varsity Jacket";
          this.sPrice1 = VARSITY_JACKET_PRICE;
        } else if (sInput.toLowerCase() == "b") {
          this.sJacket1 = "Fleece Jacket";
          this.sPrice1 = FLEECE_JACKET_PRICE;
        }
        this.priceBeforeTax = this.sPrice1;
        aReturn.push(
          `What size ${this.sJacket1} would you like: xs, s, m, l, or xl?`
        );
        break;
      case OrderState.SIZE:
        this.stateCur = OrderState.COLOUR;
        this.sSize1 = sInput;
        aReturn.push(
          `What colour ${this.sJacket1} would you like: blue, black, green, navy?`
        );
        break;
      case OrderState.COLOUR:
        this.stateCur = OrderState.JACKET2;
        this.sColour1 = sInput;
        aReturn.push("Awesome choice!");
        aReturn.push("&#127880;&#127880;&#127880;&#127880;&#127880;\n");
        aReturn.push(
          `For the second jacket your price is 150% from the original one! Only in the college! Unique offer!`
        );
        aReturn.push("Which one will make you happy?");
        aReturn.push("Select option 'a' for Varsity jacket");
        aReturn.push("Select option 'b' for Fleece jacket");
        break;
      case OrderState.JACKET2:
        this.stateCur = OrderState.SIZE2;
        if (sInput.toLowerCase() == "a") {
          this.sJacket2 = "Varsity Jacket";
          this.sPrice2 = VARSITY_JACKET_PRICE * 1.5;
        } else if (sInput.toLowerCase() == "b") {
          this.sJacket2 = "Fleece Jacket";
          this.sPrice2 = FLEECE_JACKET_PRICE * 1.5;
        }
        this.priceBeforeTax += this.sPrice2;
        aReturn.push(
          `What size ${this.sJacket2} would you like: xs, s, m, l, or xl?`
        );
        break;
      case OrderState.SIZE2:
        this.stateCur = OrderState.COLOUR2;
        this.sSize2 = sInput;
        aReturn.push(
          `What colour ${this.sJacket2} would you like: blue, black, green, navy?`
        );
        break;
      case OrderState.COLOUR2:
        this.stateCur = OrderState.PROTECTOR;
        this.sColour2 = sInput;
        aReturn.push(
          `Safe your awesome jackets with the best College Cap for only $${this.sProtectorPrice}!`
        );
        break;
      case OrderState.PROTECTOR:
        this.isDone(true);
        this.sProtector = sInput;

        aReturn.push("Fantastic choice!");
        aReturn.push("&#127880; &#127880; &#127880; &#127880; &#127880;\n");
        aReturn.push("Your order is complete.");
        aReturn.push("Thank-you for your order of:");
        if (
          this.sJacket1 == this.sJacket2 &&
          this.sSize1 == this.sSize2 &&
          this.sColour1 == this.sColour2
        ) {
          aReturn.push(
            `${this.sJacket1} x 2, size: ${this.sSize1}, colour: ${this.sColour1} for $${this.priceBeforeTax}`
          );
        } else {
          aReturn.push(
            `${this.sJacket1}, size: ${this.sSize1}, colour: ${this.sColour1} for $${this.sPrice1}`
          );
          aReturn.push(
            `${this.sJacket2}, size: ${this.sSize2}, colour: ${this.sColour2} for $${this.sPrice2}`
          );
        }
        if (this.sProtector.toLowerCase() != "no") {
          aReturn.push(`College Cap for $${this.sProtectorPrice}`);
          this.priceBeforeTax += parseFloat(this.sProtectorPrice);
        }
        this.tax = parseFloat(this.priceBeforeTax) * parseFloat(this.taxRate);
        this.totalPrice = parseFloat(this.priceBeforeTax + this.tax);
        aReturn.push(`Price before tax: $${this.priceBeforeTax.toFixed(2)}`);
        aReturn.push(`Tax: $${this.tax.toFixed(2)} (13%)`);
        aReturn.push(`Total Price: $${this.totalPrice.toFixed(2)}`);

        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
        break;
    }
    return aReturn;
  }
};
