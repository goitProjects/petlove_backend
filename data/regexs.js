const emailRegexp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const phoneRegexp = /^\+38\d{10}$/;
const urlRegexp = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/;
const birthdayRegexp = /^\d{4}-\d{2}-\d{2}$/;

module.exports = {
    regexs: {
        email: emailRegexp,
        phone: phoneRegexp,
        url: urlRegexp,
        birthday: birthdayRegexp
}}