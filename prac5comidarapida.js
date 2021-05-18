const readline = require('readline');
let rl = readline.createInterface(process.stdin, process.stdout);

class Order {
    constructor(_number) {
        this.number = _number;
        this.served = false;
    }

    getNumber() {
        return this.number;
    }

    getServed() {
        return this.served;
    }

    setServed() {
        this.served = true;
    }
}

class Customer {
    constructor(_order) {
        this.order = _order;
        this.seconds = 1;
    }
    checkServed() {
        if (!this.order.getServed()) {
            this.seconds = this.seconds + 1;
            this.wait()
        } else {
            console.log(this.order.getNumber() + ' servido!');
        }
    }

    customerWaiting() {
        console.log(this.order.getNumber() + ' espera ' + this.seconds + ' segundos!');
        this.checkServed()
    } wait() {
        setTimeout(this.customerWaiting.bind(this), 1000);
    }
}

const orders = [];

function closedMain() {
    rl.close();
    console.log('------------------  CERRADO  --------------------');
}

function processInput(input) {
    console.log(input)
    let servedOrder = orders.find(order => order.number == input);
    servedOrder.setServed();
    if (orders.every(order => order.getServed())) {
        setTimeout(closedMain.bind(this), 1000);
    }
}

rl.on('line', processInput);

for (i = 0; i < 5; i++) {
    order = new Order(`p${i}`);
    cliente = new Customer(order);
    orders.push(order);
    cliente.wait();
}