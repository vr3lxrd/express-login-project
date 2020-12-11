const session = require("express-session")

module.exports = {

    leitor_required: function(){
        if (session.cargo === 'leitor' || session.cargo === 'gestor' || session.cargo === 'admin'){
            return false
        }
        return true
    },
    gestor_required: function (){
        if (session.cargo === 'gestor' || session.cargo === 'admin'){
            return false
        }
        return true
    },
    admin_required: function (){
        if (session.cargo === 'admin'){
            return false
        }
        return true
    }
}
