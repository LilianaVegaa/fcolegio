export default {
    methods: {
        toFixedNoRound(number, precision = 2) {
            let num = number.toString().replace(/,/g, '')
            let factor = Math.pow(10, precision)
            return Math.floor(num * factor) / factor
        }
    }
}