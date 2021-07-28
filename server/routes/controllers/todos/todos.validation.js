const { check } = require('express-validator');
class TodosValidator {
    constructor() {
        this.createFields = [
            check('text', 'This text field should be there in request')
                .exists(),
            check('text', 'This text must be 3+ character long')
                .isLength({ min: 3 }),
            check('completed', 'completed field should be there in request')
                .exists(),
            check('completed', 'completed field must be boolean')
                .isBoolean()
        ]
    }

    create() {
        return this.createFields;
    }

}

module.exports = new TodosValidator()