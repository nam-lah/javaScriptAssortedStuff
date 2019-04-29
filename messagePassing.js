
// Lessons from http://michaux.ca/articles/sicp-classes-for-javascript
// Inspired on SICP's notes about message passing.


/*
1) An object may be represented as a function of its messages.
The *main* constructor function makeAccount() sends
a message to dispatch, which executes the associated method/function:
*/ 
function makeFromRealImg(x, y) {
    
    function dispatch(op) {
        switch (op) {
            case 'realPart': return x;
            case 'imagPart': return y;
            case 'magnitude': return Math.atan2(y, x);
            default: 
                throw "Uknown op: " + op;
        }
    }
    return dispatch;
}


/* 
2) Then, the concept of "mutable object" is introduced,
and the way the dispatch procedure is used, varies a bit;
here, the constructor function passes the message to dispatch,
who then calls a method/function associated to said message:
*/ 
function makeAccont(balance) {

    function current() {
      return balance;
    }
    function deposit(amount) {
        return balance += amount;
    }
    function withdraw(amount) {
        return balance -= amount;
    }
    function dispatch(mssg) {
        switch(mssg) {
            case 'balance': return current;            
            case 'deposit': return deposit;			
            case 'withdraw': return withdraw;						
            default: 
                throw 'Uknown request: ' + mssg;
        }
    }
    return dispatch; 
}
/*
From the above example:
var someAccount = makeAccount(100); 
someAccount('deposit')(23);
someAccount('current')();
... 
*/ 


/*
3) Then, more à la javaScript, 
using built-in lookup table:
*/
function makeAccount(balance) {
    
    function current() {
        return balance;
    }
    function deposit(amount) {
        return balance += amount;
    }
    function withdraw(amount) {
        return balance -= amount;
    }
    return {
        current: current,
        deposit: deposit,
        withdraw: withdraw
    };
}
/* so that:
var someAccount = makeAccount(100);
someAccount.deposit(50);
someAccount.balance();
...
*/


