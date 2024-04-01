const zod = require("zod");
const errorMiddleware = require("../Middleware/errorHandler");

// regex's for input validation

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-zod])(?=.*[A-zod])(?=.*[a-zodA-zod]).{8,}$/;
const latitudeRegex = /^-?([0-8]?[0-9]|90)\.\d{1,6}$/;
const longitudeRegex = /^-?((1?[0-7]?|[0-9]?)[0-9]|180)\.\d{1,6}$/;



// schemas for input validation

const loginSchema = zod.object({
    emailId: zod.string().regex(emailRegex, { message: 'Invalid email format' }),
    password: zod.string().regex(passwordRegex, { message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit' }),
});

const addConnectionInputSchema = zod.object({
    emailId: zod.string().email(),
    connections: zod.array(zod.string().email())
});

const validateSendAlertSchema = zod.object({
    latitude: zod.string().regex(latitudeRegex, { message: 'Invalid latitude format' }),
    longitude: zod.string().regex(longitudeRegex, { message: 'Invalid longitude format' })
});



// methods for input validation

const validateLoginInputs = (req, res, next) => {
    const result = loginSchema.safeParse(req.body)
    if(!result.success) {
        const errorMessages = result.error.errors.map(error => error.message);
        return res.json({
            error : true,
            errorMessages : result.error.errors
        })
    }
    else next()
}

const validateAddConnectionInput = (req, res, next) => {
    const result = addConnectionInputSchema.safeParse(req.body)
    if(!result.success) {
        const errorMessages = result.error.errors.map(error => error.message);
        console.log(errorMessages)
        return res.json({
            error : true,
            errorMessages : result.error.errors
        })
    }
    else next()
}

const validateSendAlertInputs = (req, res, next) => {
    const result = validateSendAlertSchema.safeParse(req.body)
    if(!result.success) {
        const errorMessages = result.error.errors.map(error => error.message);
        return res.json({
            error : true,
            errorMessages : result.error.errors
        })
    }
    else next()
}

const validateSignUpInputs = (req, res, next) => {
    const result = loginSchema.safeParse(req.body.credentials)
    if(!result.success) {
        const errorMessages = result.error.errors.map(error => error.message);
        return res.json({
            error : true,
            errorMessages : result.error.errors
        })
    }
    else next()
}


// exporting for use

module.exports = {validateAddConnectionInput, validateLoginInputs, validateSendAlertInputs, validateSignUpInputs}