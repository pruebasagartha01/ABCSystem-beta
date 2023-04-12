const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MySQLAdapter = require("@bot-whatsapp/database/mysql");
const mysql = require("mysql");
const abc = require("./arrays");

//** Declaramos los arreglos  */
abc.abecedario
abc.email


/**
 * Declaramos las conexiones de MySQL
 */
const MYSQL_DB_HOST = "localhost";
const MYSQL_DB_USER = "pepito";
const MYSQL_DB_PASSWORD = "11111";
const MYSQL_DB_NAME = "pepito";
const MYSQL_DB_PORT = "3306";

const connection = mysql.createConnection({
  host     : MYSQL_DB_HOST,
  user     : MYSQL_DB_USER,
  password : MYSQL_DB_PASSWORD,
  database : MYSQL_DB_NAME
});

const createTable  = () => {     
  let query = "CREATE TABLE IF NOT EXISTS usuarios (nombre varchar(50), apellidos varchar(50), correo varchar(50), contacto numeric(50));";
  connection.connect();
  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error)
      //throw error;      
    }
  });     
}


const flowSecundario = addKeyword(["1"]).addAnswer(
  "preciona el link👉🏻https://agencyagartha.cl/shop/"
);
const flowpregunta = addKeyword(["2"]).addAnswer(
  "preciona el link👉🏻https://agencyagartha.cl/our-services/"
);
const flowcanva = addKeyword(["3"]).addAnswer(
  "preciona el link👉🏻https://www.canva.com/es_mx/pro/"
);
const flowmegusto = addKeyword(["7"]).addAnswer("😃");
const flownomegusto = addKeyword(["4"]).addAnswer("😡");
const flowcomentario = addKeyword([
  "finalizar",
  "Finalizar",
  "fin",
  "terminar",
  "Terminar",
]).addAnswer([
  "Gracias!!😁 por comunicarte con *Agarta Marketing gency*",
  "",
  "estaremos en contacto nuevamente !!!",
]);

const flowpmenu = addKeyword(["menu", "Menu", "MENU", "Listado"]).addAnswer([
  "MENU📝",
  "",
  "Email",
  "",
  "-https://agencyagartha.cl/email-marketing/ ☑",
  "",
  "Media",
  "",
  "https://agencyagartha.cl/social-media-marketing/☑",
  "",
  "SEO",
  "",
  " - https://agencyagartha.cl/search-engine-optimization/☑",
  "",
  "Local",
  "",
  " - https://agencyagartha.cl/local-seo/",
  "",
  "Click",
  " - https://agencyagartha.cl/pay-per-click-ppc-management/☑",
  "",
  "",
  "ABC",
  "",
  "  - https://agencyagartha.cl/our-services/ ☑",
]);

const flowAgartha = addKeyword(["Agartha", "documentacion", "documentación"]);

const flowTerminar = addKeyword(["Gracias", "grac"]).addAnswer(
  [
    "🚀 Puedes aportar tu granito de arena a este proyecto",
    "[*opencollective*] https://opencollective.com/bot-whatsapp",
    "[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez",
    "[*patreon*] https://www.patreon.com/leifermendez",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);


/*const flowDatos = addKeyword(["1", "⬅️ Volver al Inicio"])
  .addAnswer(
    [
      "Hola!",
      "Para enviar el formulario necesito unos datos...",
      "Escriba su *Nombre*",
    ],
    { capture: true, buttons: [{ body: "❌ Cancelar solicitud" }] },
    async (ctx, { flowDynamic, endFlow }) => {
      if (ctx.body == "❌ Cancelar solicitud")
        return endFlow({
          body: "❌ Su solicitud ha sido cancelada ❌", // Aquí terminamos el flow si la condicion se comple
          buttons: [{ body: "⬅️ Volver al Inicio" }], // Y además, añadimos un botón por si necesitas derivarlo a otro flow
        });
      nombre = ctx.body;
      return flowDynamic(`Encantado *${nombre}*, continuamos...`);
    }
  )*/

const flowSaludo = addKeyword(["Hola", "Buenas", "HOLA", "Hola"])
  .addAnswer([
    "Hola 😁 En Agartha Marketing Agency te damos la bienvenida.",
    "Te has comunicado con Agartha Marketing Agency.",
    "",
    "Este es nuestro nuevo sistema de Chat Bot de Autoatención ABC System.",
    "Es una prueba Beta de este sistema por lo que agradecemos tu colaboración y sugerencias.",
    "Esta supervisada en tiempo real por ejecutivos humanos",
    "",
    "Un gusto porder atenderte 🙌",
  ])
  .addAnswer(
    ["Para registrarse ingrese *Registro*"]
  )

const flowRegistro = addKeyword(['Registro'])
  .addAnswer(
    "¿Tu Nombre?",
    { capture: true },
    (ctx, { fallBack }) => {
        val = ctx.body
        ab = abc.abecedario
        cont = false
        for(i = -1; i < ab.length; i++) {
          val.lastIndexOf(ab[i])
          if(val.lastIndexOf(ab[i]) != -1){
            cont = true
          }
        }if(cont === false){
          return fallBack();
        }
        nombre = val
      }
      )
    

  .addAnswer(
    "¿Tu Apellido Paterno?",
    { capture: true},
    (ctx, { fallBack }) => {
      val = ctx.body
      ab = abc.abecedario
      cont = false
      for(i = -1; i < ab.length; i++) {
        val.lastIndexOf(ab[i])
        if(val.lastIndexOf(ab[i]) != -1){
          cont = true
        }
      }if(cont === false){
        return fallBack();
      }
      paterno = val
    }
  )
  .addAnswer(
    "¿Apellido Materno?",
    { capture: true  },
    (ctx, { fallBack }) => {
      val = ctx.body
      ab = abc.abecedario
      cont = false
      for(i = -1; i < ab.length; i++) {
        val.lastIndexOf(ab[i])
        if(val.lastIndexOf(ab[i]) != -1){
          cont = true
        }
      }if(cont === false){
        return fallBack();
      }
      materno = val
    }
  )
  .addAnswer(
    "Correo Electronico",
    { capture: true  },
    (ctx, { fallBack }) => {
      val = ctx.body
      ab = abc.email
      cont = false
      for(i = -1; i < ab.length; i++) {
        val.lastIndexOf(ab[i])
        if(val.lastIndexOf(ab[i]) != -1){
          cont = true
        }
      }if(cont === false){
        return fallBack();
      }
      correo = val
      fono = ctx.from
    }
  )

  .addAnswer("Gracias por la Información, verificando datos de acceso 🕓",null,(ctx) => {
    nom = nombre
    pat = paterno
    mat = materno
    corr = correo
    fon = fono
    setDataToDB({'Nombre': nom ,'Apellidos': pat + ' ' +  mat, 'Correo': corr, 'Contacto': fon});  
  }
  )
  .addAnswer("datos guardados con exito", { delay: 1700 }) 
  .addAnswer(
    "fin coloca gracias *gracias*",
    { capture: true /*buttons: [{ body: "❌ Cancelar solicitud" }]*/ },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes("gracias")) {
        return fallBack();
      }
      console.log("Aquí viene todo: ", ctx.body);
    }
  )

  const exists = async (datos) => {
    let ex = false;    
    let query = "SELECT * FROM usuarios WHERE correo = '"+datos.Contacto+"';";
    await connection.query(query, function (error, results, fields) {
      if (error) throw error;
      console.log(results, fields);
      ex = fields.length > 0;
    });     
    return ex;
  }

  const setDataToDB = async (datos) => {        
    if(await exists(datos) == false){     
      console.log(datos);      
      let query = "INSERT INTO usuarios VALUES ('"+datos.Nombre+"', '"+datos.Apellidos+"', '"+datos.Correo+"', '"+datos.Contacto+"');";
      console.log(query);
      connection.query(query, function (error, results, fields) {
        if (error) throw error;      
      });       
      return true;
    } else {
      console.log("El usuario ya existe, no se puede guardar");
      return false;
    }    
  }

  const flowEncuesta = addKeyword('9')
  .addAnswer(
    "Encuenta de Atencion coloca *siguiente*",
    { capture: true /*buttons: [{ body: "❌ Cancelar solicitud" }]*/ },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes("siguiente")) {
        return fallBack();
      }
      console.log("Aquí viene todo: ", ctx.body);
    }
  )
  .addAnswer([
    "*Indicanos en qué podemos ayudarte* 🌀",
    "",
    "Seleccione *1* ¿Cotizar Página Web?",
    "",
    "Seleccione *2* ¿Cotizar ABC System de Autoatención?",
    "",
    "Seleccione *3* ¿Comprar Canva Pro?",
    "",
    "Escribe *Listado* para ver todos nuestos links",
    "",
    "*Encuesta de nuestra atencion* 💭",
    "",
    "Escriba *7* ¿si me gusta?",
    "",
    "Escriba *8* ¿no me gusto?",
    "",
    "Ecriba *Finalizar* para terminar la conversacion",
  ]);

const main = async () => {  
  const adapterDB = new MySQLAdapter({
    host: MYSQL_DB_HOST,
    user: MYSQL_DB_USER,
    database: MYSQL_DB_NAME,
    password: MYSQL_DB_PASSWORD,
    port: MYSQL_DB_PORT,
  });
  createTable();  
    
  const adapterFlow = createFlow([
    flowcomentario,
    flownomegusto,
    flowcanva,
    flowmegusto,
    flowSaludo,
    flowpregunta,
    flowAgartha,
    flowTerminar,
    flowSecundario,
    flowpmenu,
    flowRegistro,
  ]);
  const adapterProvider = createProvider(BaileysProvider);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  QRPortalWeb();
};