
class Utils {
    getDate() {
        const now = new Date();
        return now.toString();
    }
}

module.exports = new Utils();