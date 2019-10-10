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
    if(rawStateName === 'RECIBIDO')return 'id-number'
    if(rawStateName === 'ESPERANDO_PRESUPUESTO')return 'dollar'
    if(rawStateName === 'REPARACION')return 'build'
    if(rawStateName === 'RETIRAR_SINARREGLO')return 'ban-circle'
    if(rawStateName === 'REPARADO')return 'clean'
    if(rawStateName === 'CANCELADA')return 'delete' 
    if(rawStateName === 'ENTREGADO')return 'endorsed' 
    return ''
}