import { MercadoPagoConfig, Preference } from 'mercadopago';
import { HOST, MERCADOPAGO_TOKEN } from '../config.js';



export const crearOrder = async (req) => {
    
    const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_TOKEN });

    const preference = new Preference(client);

    const idPreference = await preference.create({
        body: {
            items: req.productos,
            back_urls: {
                success: "https://dev.shopcauchosmc.com/success",//`${HOST}/success`,
                failure: "https://dev.shopcauchosmc.com/failure",//`${HOST}/failure`,
                pending: "https://dev.shopcauchosmc.com/pending",//`${HOST}/pending`,
            },
            auto_return: 'approved',
            payer:{
                phone: {number: req.telefono},
                address: {street_name: req.direccion + " - " + req.ciudad},
                email: req.correo,
                identification: {number: req.nit},
                name: req.persona
            },
            notification_url: "https://dev.shopcauchosmc.com/api/webhook",

        }
      })
      .then()
      .catch(console.log);
    //console.log(idPreference.init_point)
    //console.log(idPreference.sandbox_init_point)
    const data = {url : idPreference.init_point};
    return data;
}
