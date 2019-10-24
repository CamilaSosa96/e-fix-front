export function stateNameTranslator(rawStateName){
    switch(rawStateName){
        case 'RECIBIDO': return 'Recibido'
        case 'ESPERANDO_PRESUPUESTO' : return 'Esperando aprobación de presupuesto'
        case 'REPARACION' : return 'En reparación'
        case 'RETIRAR_SINARREGLO' : return 'Listo para retirar sin reparar'
        case 'REPARADO' : return 'Reparado'
        case 'CANCELADA' : return 'Reparación cancelada'
        case 'ENTREGADO' : return 'Entregado'
        default : return ''
    }
}

export function stateColorSelector(rawStateName){
    switch(rawStateName){
        case 'RECIBIDO': return '#686868'
        case 'ESPERANDO_PRESUPUESTO' : return '#22C0EA'
        case 'REPARACION' : return '#003AFF'
        case 'RETIRAR_SINARREGLO' : return '#FE0000'
        case 'REPARADO' : return '#3AFF00'
        case 'CANCELADA' : return '#9A0000'
        case 'ENTREGADO' : return '#239A00'
        default : return ''
    }
}

export function stateIconSelector(rawStateName){
    switch(rawStateName){
        case 'RECIBIDO': return 'import'
        case 'ESPERANDO_PRESUPUESTO' : return 'dollar'
        case 'REPARACION' : return 'wrench'
        case 'RETIRAR_SINARREGLO' : return 'ban-circle'
        case 'REPARADO' : return 'clean'
        case 'CANCELADA' : return 'delete' 
        case 'ENTREGADO' : return 'endorsed'
        default : return ''
    }
}

export function stateTextForClient(rawStateName){
    const text = {msg1: '', msg2: ''}
    switch(rawStateName){
        case 'RECIBIDO': 
            text.msg1 = 'se encuentra ingresado en el sistema.'
            text.msg2 = 'Próximamente será revisado por un técnico.'
            return text
        case 'ESPERANDO_PRESUPUESTO' : 
            text.msg1 = 'se encuentra esperando la aprobación de la reparación.'
            return text
        case 'REPARACION' :
            text.msg1 = 'se encuentra en proceso de reparación.'
            text.msg2 = 'Se le notificará cuando termine el mismo.'
            return text
        case 'RETIRAR_SINARREGLO' : 
            text.msg1 = 'se encuentra listo para ser retirado sin reparación.'
            text.msg2 = 'Esperamos su visita para que lo retire.'
            return text
        case 'REPARADO' : 
            text.msg1 = 'ya se encuentra reparado.'
            text.msg2 = 'Esperamos su visita para que abone la reparación y retire el producto.'
            return text
        case 'CANCELADA' : 
            text.msg1 = 'ha sido retirado sin reparar.'
            text.msg2 = 'No se ha aprobado la reparación y esta ha sido cancelada.'
            return text
        case 'ENTREGADO' : 
            text.msg1 = 'ha sido reparado.'
            text.msg2 = 'La reparación fue abonada y el producto retirado.'
            return text
        default : return text
    }
}