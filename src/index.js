export default class BarcodeScanner {
    constructor(options = {}) {
        this.barcode = ''
        this.typingTimer = null

        this.callback = options.callback || function (barcode) {
            console.log('Barcode scanned: ' + barcode)
        }

        this.listener = event => {
            this.keyUpHandler(event)
        }
        document.addEventListener('keyup', this.listener)
    }

    keyUpHandler(event) {
        if (event.key === 'Enter') {
            return
        }

        clearTimeout(this.typingTimer)
        this.barcode += event.key

        this.typingTimer = setTimeout(this.check.bind(this), 120)
    }

    check() {
        if (this.isEAN13() || this.isUPCA()) {
            this.callback(this.barcode)
        }

        this.barcode = ''
    }

    isEAN13() {
        return /^\d{13}$/.test(this.barcode)
    }

    isUPCA() {
        return /^\d{12}$/.test(this.barcode)
    }

    destroy() {
        document.removeEventListener('keyup', this.listener)
    }
}
