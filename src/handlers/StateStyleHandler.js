export function stateNameTranslator(rawStateName){
    if(rawStateName === 'RECIBIDO')return 'Recibido'
    if(rawStateName === 'ESPERANDO_PRESUPUESTO')return 'Esperando aprobación de presupuesto'
    if(rawStateName === 'REPARACION')return 'En reparación'
    if(rawStateName === 'RETIRAR_SINARREGLO')return 'Listo para retirar sin reparar'
    if(rawStateName === 'REPARADO')return 'Reparado'
    if(rawStateName === 'CANCELADA')return 'Reparación cancelada'
    if(rawStateName === 'ENTREGADO')return 'Entregado'
    return ''
}

export function stateColorSelector(rawStateName){
    if(rawStateName === 'RECIBIDO')return '#686868'
    if(rawStateName === 'ESPERANDO_PRESUPUESTO')return '#22C0EA'
    if(rawStateName === 'REPARACION')return '#003AFF'
    if(rawStateName === 'RETIRAR_SINARREGLO')return '#FE0000'
    if(rawStateName === 'REPARADO')return '#3AFF00'
    if(rawStateName === 'CANCELADA')return '#9A0000'
    if(rawStateName === 'ENTREGADO')return '#239A00'
    return ''
}

export function stateIconSelector(rawStateName){
    if(rawStateName === 'RECIBIDO')return 'import'
    if(rawStateName === 'ESPERANDO_PRESUPUESTO')return 'dollar'
    if(rawStateName === 'REPARACION')return 'wrench'
    if(rawStateName === 'RETIRAR_SINARREGLO')return 'ban-circle'
    if(rawStateName === 'REPARADO')return 'clean'
    if(rawStateName === 'CANCELADA')return 'delete' 
    if(rawStateName === 'ENTREGADO')return 'endorsed' 
    return ''
}

export function stateTextForClient(rawStateName){
    const text = {msg1: '', msg2: ''}
    if(rawStateName === 'RECIBIDO'){
        text.msg1 = 'se encuentra ingresado en el sistema.'
        text.msg2 = 'Próximamente será revisado por un técnico.'
    }
    if(rawStateName === 'ESPERANDO_PRESUPUESTO'){
        text.msg1 = 'se encuentra esperando la aprobación de la reparación.'
    }
    if(rawStateName === 'REPARACION'){
        text.msg1 = 'se encuentra en proceso de reparación.'
        text.msg2 = 'Se le notificará cuando termine el mismo.'
    }
    if(rawStateName === 'RETIRAR_SINARREGLO'){
        text.msg1 = 'se encuentra listo para ser retirado sin reparación.'
        text.msg2 = 'Esperamos su visita para que lo retire.'
    }
    if(rawStateName === 'REPARADO'){
        text.msg1 = 'ya se encuentra reparado.'
        text.msg2 = 'Esperamos su visita para que abone la reparación y retire el producto.'
    }
    if(rawStateName === 'CANCELADA'){
        text.msg1 = 'ha sido retirado sin reparar.'
        text.msg2 = 'No se ha aprobado la reparación y esta ha sido cancelada.'
    }
    if(rawStateName === 'ENTREGADO'){
        text.msg1 = 'ha sido reparado.'
        text.msg2 = 'La reparación fue abonada y el producto retirado.'
    }
    return text
}