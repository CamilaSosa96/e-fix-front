export function stateNameTranslator(rawStateName){
    if(rawStateName === 'RECIBIDO')return 'Recibido'
    if(rawStateName === 'ESPERANDO_PRESUPUESTO')return 'Esperando aprobación de presupuesto'
    if(rawStateName === 'REPARACION')return 'En reparación'
    if(rawStateName === 'RETIRAR_SINARREGLO')return 'Listo para retirar sin reparar'
    if(rawStateName === 'REPARADO')return 'Reparado'
    if(rawStateName === 'CANCELADA')return 'Reparación Cancelada'
    if(rawStateName === 'ENTREGADO')return 'Entregado'
    return ''
}