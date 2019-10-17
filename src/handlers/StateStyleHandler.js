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
    if(rawStateName === 'RECIBIDO')return 'ingresado en el sistema. Próximamente será revisado por un técnico.'
    if(rawStateName === 'REPARACION')return `en proceso de reparación. Se le notificará cuando termine el mismo.`
    if(rawStateName === 'RETIRAR_SINARREGLO')return 'listo para que sea retirado sin reparación.'
    if(rawStateName === 'REPARADO')return 'reparado. Por favor, pase por el establecimiento para abonar la reparación y retirarlo.'
    if(rawStateName === 'CANCELADA')return 'retirado sin reparar por el cliente' 
    if(rawStateName === 'ENTREGADO')return 'entregado y su reparación abonada.' 
    return ''
}