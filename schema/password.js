let firstPassword = null

module.exports = {
    "properties": {
        "password": {
            "description": "Password?",
            "message": "Password must be a least 12 characters, we recommend using a passphrase like: iwillalwaysandforeverbebatman",
            "hidden": true,
            "required": true,
            "before": ( value ) => {
                "use strict"
                firstPassword = value
                return value
            },
            "conform": ( value ) => {
                "use strict"
                return value.length > 12
            }
        },
        "confirmpassword": {
            "description": "Confirm Password",
            "message": "The passwords do not match, please try again!",
            "hidden": true,
            "required": true,
            "conform": ( value ) => { // require the passwords to be equal
                "use strict"
                return value === firstPassword
            }
        }
    }
}
