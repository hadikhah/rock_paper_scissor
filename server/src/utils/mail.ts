import { TransportOptions, createTransport } from "nodemailer"
import ejs from "ejs"
import path from "path";
import process from "process"

interface TransportMailOptionsCredentials {
    user?: String
    pass?: String
}

interface TransportMailOptions extends TransportOptions {
    host?: String
    port?: number | String
    secure?: Boolean | null
    auth?: TransportMailOptionsCredentials
}

/** 
 *  email schema
 * @type {*}
 */
const transporter = () => {

    /**
     * email schema options
     * 
     *  @type {*} 
    */
    const mailOptions: TransportMailOptions = {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE == "true" ? true : (process.env.MAIL_SECURE == "false") ? false : null,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    }

    return createTransport(mailOptions);

}
/**
 * send email using html body format
 *
 * @param {string} receivers
 * @param {string} subject
 * @param {string} htmlBody
 * @return {*} 
 */
export const sendMailHTML = async (receivers: string, subject: string, htmlBody: string) => {

    const info: any = await transporter().sendMail({
        from: process.env.MAIL_FROM, // sender address
        to: receivers, // list of receivers
        subject: subject, // Subject line
        html: htmlBody, // html body
    });

    return info
}

/**
 * send email using text only format
 *
 * @param {string} receivers
 * @param {string} subject
 * @param {string} textBody
 * @return {*} 
 */
export const sendMailTEXT = async (receivers: string, subject: string, textBody: string) => {

    const info: any = await transporter().sendMail({
        from: process.env.MAIL_FROM, // sender address
        to: receivers, // list of receivers
        subject: subject, // Subject line
        text: textBody, // plain text body
    });

    return info

}

/**
 * renders ejs file with given data and returns html string
 *
 * @param {string} template
 * @param {*} [data={}]
 * @return {*} 
 */
export const renderTemplateEjs = async (template: string, data = {}) => {

    const templatePath = path.join(__dirname, `../templates/${template}.ejs`)

    const html = await ejs.renderFile(templatePath, data)

    return html

}