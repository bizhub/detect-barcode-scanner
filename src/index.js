export default class useScanner
{
    constructor(success) {
        this.success = success
        this.timeout = null
        this.buffer = ''

        this.listener = event => {
            this.handler(event)
        }
        document.addEventListener('keyup', this.listener)
    }

    handler({key}) {
        let valid = '0123456789'

        if (valid.includes(key)) {
            clearTimeout(this.timeout)
            this.buffer = this.buffer + key

            if (this.buffer.length == 13) {
                this.success(this.buffer)

                this.buffer = ''
            }

            this.timeout = setTimeout(() => {
                this.buffer = ''
            }, 120)
        }
    }

    destroy() {
        document.removeEventListener('keyup', this.listener)
    }
}