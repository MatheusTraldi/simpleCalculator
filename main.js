function focusOnApp() {
    document.getElementById('app').focus();
}

const app = new Vue({
    el: '#app',
    data: {
        displayValue: '0',
        isFloat: false,
        toCalculate: undefined,
        toCalculate2: undefined,
        operationSetted: false,
        resetedToNewValue: false,
        operationSelected: undefined,
        triggerSigma: false,
        resultIsTriggered: false,
        fontSizeStyle: { fontSize: '95px' },
    },
    methods: {

        updateDisplay(value) {

            if(value.length / 9 >= 1) {
                this.fontSizeStyle = {
                    fontSize: '45px',
                };
            }
            else {
                this.fontSizeStyle = {
                    fontSize: '95px',
                };
            }

            if(value.length > 17) {
                value = value.slice(0, 17);
            }

            this.displayValue = value;
        },

        insertOnDisplay(value) {
            
            if(!this.operationSetted) {

                if(this.displayValue == '0') {
                    if(value != '.') {
                        this.updateDisplay(value);
                        return false;
                    }
                    else {
                        this.updateDisplay('0.');
                        this.isFloat = true;
                        return false;
                    }
                }

                if(value == '.') {
                    if(!this.isFloat) {
                        let concat = this.displayValue + value;
                        this.updateDisplay(concat);
                        this.isFloat = true;
                        return false;
                    }
                    else return false;
                }

                let concat = this.displayValue + value;
                this.updateDisplay(concat);
            }

            else {

                if(!this.resetedToNewValue) {
                    this.updateDisplay(value);
                    this.resetedToNewValue = true;
                    this.toCalculate2 = Number(this.displayValue);
                    this.triggerSigma = true;
                }

                else {
                    if(this.displayValue == '0') {
                        if(value != '.') {
                            this.updateDisplay(value);
                            this.toCalculate2 = Number(this.displayValue);
                            this.triggerSigma = true;
                            return false;
                        }
                        else {
                            this.updateDisplay('0.');
                            this.isFloat = true;
                            this.toCalculate2 = Number(this.displayValue);
                            this.triggerSigma = true;
                            return false;
                        }
                    }
    
                    if(value == '.') {
                        if(!this.isFloat) {
                            let concat = this.displayValue + value;
                            this.updateDisplay(concat);
                            this.isFloat = true;
                            this.toCalculate2 = Number(this.displayValue);
                            this.triggerSigma = true;
                            return false;
                        }
                        else return false;
                    }
                    
                    let concat = this.displayValue + value;
                    this.updateDisplay(concat);
                    this.toCalculate2 = Number(this.displayValue);
                    this.triggerSigma = true;
                }
            }
        },

        removeFromDisplay() {
            if(this.displayValue.length == 1) {
                this.updateDisplay('0');
                return false;
            }

            if(this.displayValue[this.displayValue.length - 1] == '.') {
                this.isFloat = false;
            }

            let removeLast = this.displayValue.slice(0,(this.displayValue.length - 1));
            this.updateDisplay(removeLast);
        },
            
        sum() {
            this.toCalculate = Number(this.displayValue);
            this.operationSetted = true;
            this.isFloat = false;
            this.operationSelected = 'sum';
        },

        mult() {
            this.toCalculate = Number(this.displayValue);
            this.operationSetted = true;
            this.isFloat = false;
            this.operationSelected = 'mult';
        },

        sub() {
            this.toCalculate = Number(this.displayValue);
            this.operationSetted = true;
            this.isFloat = false;
            this.operationSelected = 'sub';
        },

        div() {
            this.toCalculate = Number(this.displayValue);
            this.operationSetted = true;
            this.isFloat = false;
            this.operationSelected = 'div';
        },

        result() {

            if(this.operationSelected == 'sum') {
                if(!this.resultIsTriggered) {
                    let sum = `${Number(this.displayValue) + this.toCalculate}`;
                    this.updateDisplay(sum);
                    this.resultIsTriggered = true;
                }

                else if(!this.triggerSigma) {
                    let sum = `${Number(this.displayValue) + this.toCalculate}`;
                    this.updateDisplay(sum);
                }
        
                else {
                    let sum = `${Number(this.displayValue) + this.toCalculate2}`;
                    this.updateDisplay(sum);
                }
            }

            if(this.operationSelected == 'mult') {
                if(!this.resultIsTriggered) {
                    let mult = `${Number(this.displayValue) * this.toCalculate}`;
                    this.updateDisplay(mult);
                    this.resultIsTriggered = true;
                }

                else if(!this.triggerSigma) {
                    let mult = `${Number(this.displayValue) * this.toCalculate}`;
                    this.updateDisplay(mult);
                }
        
                else {
                    let mult = `${Number(this.displayValue) * this.toCalculate2}`;
                    this.updateDisplay(mult);
                }
            }

            if(this.operationSelected == 'sub') {
                if(!this.resultIsTriggered) {
                    let sub = `${this.toCalculate - Number(this.displayValue)}`;
                    this.updateDisplay(sub);
                    this.resultIsTriggered = true;
                }

                else if(!this.triggerSigma) {
                    let sub = `${Number(this.displayValue) - this.toCalculate}`;
                    this.updateDisplay(sub);
                }
        
                else {
                    let sub = `${Number(this.displayValue) - this.toCalculate2}`;
                    this.updateDisplay(sub);
                }
            }

            if(this.operationSelected == 'div') {
                if(!this.resultIsTriggered) {
                    let div = `${this.toCalculate / Number(this.displayValue)}`;
                    this.updateDisplay(div);
                    this.resultIsTriggered = true;
                }

                else if(!this.triggerSigma) {
                    let div = `${Number(this.displayValue) / this.toCalculate}`;
                    this.updateDisplay(div);
                }
        
                else {
                    let div = `${Number(this.displayValue) / this.toCalculate2}`;
                    this.updateDisplay(div);
                }
            }
        },

        reset() {
            this.displayValue = '0';
            this.isFloat = false;
            this.toCalculate = undefined;
            this.toCalculate2 = undefined;
            this.operationSetted = false;
            this.resetedToNewValue = false;
            this.operationSelected = undefined;
            this.triggerSigma = false;
            this.resultIsTriggered = false;
            this.fontSizeStyle = { fontSize: '95px' };
        },
    },
});
