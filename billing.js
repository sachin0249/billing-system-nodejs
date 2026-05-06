const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let customer = {};
let items = [];

rl.question("Enter Customer Name: ", (name) => {
    customer.name = name;

    rl.question("Enter Customer ID: ", (id) => {
        customer.id = id;

        rl.question("Enter number of products: ", (n) => {
            n = parseInt(n);

            function inputItems(i) {
                if (i < n) {
                    console.log(`\nProduct ${i + 1}:`);
                    rl.question("Enter product name: ", (pname) => {
                        rl.question("Enter price: ", (price) => {
                            rl.question("Enter quantity: ", (qty) => {

                                items.push({
                                    name: pname,
                                    price: parseFloat(price),
                                    qty: parseInt(qty)
                                });

                                inputItems(i + 1);
                            });
                        });
                    });
                } else {
                    generateBill();
                }
            }

            inputItems(0);
        });
    });
});

function generateBill() {
    let total = 0;
    let billText = "\n--- BILL RECEIPT ---\n";

    billText += `Customer Name: ${customer.name}\n`;
    billText += `Customer ID: ${customer.id}\n\n`;

    billText += "Items:\n";
    billText += "Name\tPrice\tQty\tTotal\n";

    items.forEach(item => {
        let itemTotal = item.price * item.qty;
        total += itemTotal;
        billText += `${item.name}\t${item.price}\t${item.qty}\t${itemTotal}\n`;
    });

    billText += `\nGrand Total: ${total.toFixed(2)}\n`;

    // Save bill to file
    fs.writeFileSync('bill.txt', billText);

    // Display bill
    console.log(billText);
    console.log("Bill saved to bill.txt");

    rl.close();
}
