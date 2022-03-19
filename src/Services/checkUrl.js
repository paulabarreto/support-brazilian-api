exports.validateURL = function (str)
{
    if (str.indexOf("http://") === 0 || str.indexOf("https://") === 0) {
        return str
    } else {
        return "https://" + str
    }
}
