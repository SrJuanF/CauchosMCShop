import { MercadoPagoConfig, Payment} from "mercadopago"
import { MERCADOPAGO_TOKEN } from "../config.js"
import {AsignarIDSolicitudes} from '../services/IDSolicitudes.js'
import { publisher } from '../colas/publicer-Colas.js'
import { Order, UltimaDatePedid, pickDateProg } from '../services/respuestas-solicitudes.js'

let timeOutIdOrders;
let timeOutIdDates;
function stopTimeOutOrders() {
    clearTimeout(timeOutIdOrders);
}
function stopTimeOutDates() {
    clearTimeout(timeOutIdDates);
}

export const createOrder = async (req, res) => {
    // ID SOLICITUD
    const ID_SOLICITUD = AsignarIDSolicitudes();
    // AGREGAR LA ID DE LA SOLICITUD
    const message = {contenidoRX: req.body, id_solicitud: ID_SOLICITUD};
    //ENCOLAR
    await publisher("Orders", message);
    //ESPERANDO RESPUESTA
    var result = null;
    timeOutIdOrders = setTimeout(() => {
        result = Order(ID_SOLICITUD);
        if (result !== null) {
            res.send(result);
            stopTimeOutOrders();
        }
    }, 1000); 
};


export const receiveWebhook = async (req, res) => {
    
    const payment = req.query;
    //console.log(payment);
    try {
        if (payment.type === "payment") {
            
            
            const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_TOKEN });
            const capPay = new Payment(client);
            const data = await capPay.get({id: payment['data.id'] });
            
            //const data = await mercadopago.payment.findById(payment['data.id']);
            // Store in database
            if (data.status === 'approved') {
                await publisher("RegistrarPago", data);   
            }
            else if (data.status === 'in_process') {
                await publisher("RegistrarPending", data);
            }
            else if(data.status === 'cancelled'){
                await publisher("CancelarPending", data.id);
            }
        }
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json({ error: error.message });
         
    }
}

export const Tiempo_Pedido = async (req, res) => {
     // ID SOLICITUD
     const ID_SOLICITUD = AsignarIDSolicitudes();
     // AGREGAR LA ID DE LA SOLICITUD
     const message = {contenidoRX: req.body, id_solicitud: ID_SOLICITUD};
     //ENCOLAR
     await publisher("UltimaFechaPedido", message);
     //ESPERANDO RESPUESTA
     var result = null;
     timeOutIdDates = setTimeout(() => {
         result = UltimaDatePedid(ID_SOLICITUD);
         if (result !== null) {
            res.send(result);
            stopTimeOutDates();
         }
     }, 1000);

}

export const Tiempo_Pick = async (req, res) => {
    // ID SOLICITUD
     const ID_SOLICITUD = AsignarIDSolicitudes();
     // AGREGAR LA ID DE LA SOLICITUD
     const message = {contenidoRX: req.query, id_solicitud: ID_SOLICITUD};
     //ENCOLAR
     await publisher("FechaFin", message);
     //ESPERANDO RESPUESTA
     var result = null;
     timeOutIdDates = setTimeout(() => {
         result = pickDateProg(ID_SOLICITUD);
         if (result !== null) {
            res.send(result);
            stopTimeOutDates();
         }
     }, 1000);
}

// Obtén la fecha en formato Local y luego formateada
//const fechaLocal = ultimoDocumento.Date_Fin_Prodcc.toLocaleString();
//var fechaFormateada = `${fechaLocal.slice(0, 17).replace('T', ' ')}`; // Formato "año/mes/día hora:minutos"

// Formato "año/mes/día"
//ini_Prod = ini_Prod.split('T')[0];


//Ready-payments controller

import { Payments, PaymentsMounth, PaymentDelete, PaymentUpdate } from '../services/ready-payments.js';

export const get_PaymentsReady = async (req, res) => {
    const payments = await Payments();
    res.send({ data: payments});
}

export const update_PaymentReady = async (req, res) => {
    const mess = await PaymentUpdate(req);
    res.send({ message: mess});
}

export const delete_PaymentReady = async (req, res) => {
    const mess = await PaymentDelete(req);
    res.send({ message: mess});
}
 
// PaymentsMounth ?

//Pending-payments controller

import {Pendings, PendingDelete, PendingUpdate} from '../services/pending-payments.js'

export const get_PaymentsPending = async (req, res) => {
    const pendings = await Pendings();
    res.send({ data: pendings});
}

export const update_PaymentPending = async (req, res) => {
    const mess = await PendingUpdate(req);
    res.send({ message: mess});
}

export const delete_PaymentPending = async (req, res) => {
    const mess = await PendingDelete(req.query.id);
    res.send({ message: mess});
}