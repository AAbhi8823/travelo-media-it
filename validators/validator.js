
//email validatiobn 
const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
    }
    //password validation function
    const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return re.test(password);
    }
    //phone validation function
    const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
    }
    // OTP validation function OTP WILL BE 4 DIGIT NUMBER
    const validateOTP = (otp) => {
    const re = /^[0-9]{4}$/;
    return re.test(otp);
    }


    //empty req.body validation function
    const validateEmpty = (req) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json([{ status: false, errors: errors.array() }]);
        }
    }



    module.exports = {
        validateEmail,
        validatePassword,
        validatePhone,
        validateOTP,
        validateEmpty
        
    }