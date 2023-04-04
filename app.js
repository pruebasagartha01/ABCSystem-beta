const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
  } = require("@bot-whatsapp/bot");
  
  const QRPortalWeb = require("@bot-whatsapp/portal");
  const BaileysProvider = require("@bot-whatsapp/provider/baileys");
  const MySQLAdapter = require("@bot-whatsapp/database/mysql");
  
  /**
   * Declaramos las conexiones de MySQL
   */
  const MYSQL_DB_HOST = "localhost";
  const MYSQL_DB_USER = "franprueba";
  const MYSQL_DB_PASSWORD = "1234";
  const MYSQL_DB_NAME = "franprueba";
  const MYSQL_DB_PORT = "3306";

  /*** Variables y arreglos */
  let datos = []
  
  const flowtermino = addKeyword(["Gracias", "Gracias", "GRACIAS"]).addAnswer(
    ["Precione para Terminar la Conversacion "],
    {
      buttons: [
        {
          body: "Finalizar",
        },
        {
          body: "Continuar",
        },
      ],
    }
  );
  const flowgracias = addKeyword("Finalizar").addAnswer([
    "Gracias por comunicarte con nosotros simpre estaremos a su desposicion nos despedimos!!!.😁👋🏻",
  ]);
  const flowatencioncomercial = addKeyword("Atención Comercial").addAnswer([
    "En mantenimiento",
  ]);
  
  const flowproductos = addKeyword("Productos").addAnswer(
    [
      "Ingresa aquí 👇",
      "",
      "https://agencyagartha.cl/shop/",
    ],
    {
      buttons: [
        {
          body: "Volver ⬅",
        },
      ],
    }
  );
  
  const flowEmailMarketing = addKeyword("Email Marketing").addAnswer([
    "Ingresa aquí 👇, para volver atras escriba *1*",
    "",
    "https://agencyagartha.cl/email-marketing/",
  ]);
  
  const flowSocialMediaMarketing = addKeyword("Social Media Marketing").addAnswer(
    [
      "Ingresa aquí 👇, para volver atras escriba *1*",
      "",
      "https://agencyagartha.cl/social-media-marketing//",
    ]
  );
  
  const flowSearchEngineOptimization = addKeyword(
    "Search Engine Optimization"
  ).addAnswer([
    "Ingresa aquí 👇, para volver atras escriba *1*",
    "",
    "https://agencyagartha.cl/search-engine-optimization/",
  ]);
  
  const flowLocalSEO = addKeyword("Local SEO").addAnswer([
    "Ingresa aquí 👇, para volver atras escriba *1*",
    "",
    "https://agencyagartha.cl/local-seo/",
  ]);
  
  const flowPayPerClick = addKeyword("Pay Per Click").addAnswer([
    "Ingresa aquí 👇, para volver atras escriba *1*",
    "",
    "https://agencyagartha.cl/pay-per-click-ppc-management/",
  ]);
  
  const flowABCSystem = addKeyword("ABC System").addAnswer([
    "Ingresa aquí 👇, para volver atras escriba *1*",
    "",
    "https://agencyagartha.cl/our-services/",
  ]);
  const flowmensaje = addKeyword("Soporte Técnico").addAnswer(["En desarrollo"]);
  
  const flowServicios = addKeyword(["Servicios"]).addAnswer(
    ["*Menú opciones 👇*"],
    {
      buttons: [
        {
          body: "Email Marketing",
        },
        {
          body: "Social Media Marketing",
        },
        {
          body: "Search Engine Optimization",
        },
        {
          body: "Local SEO",
        },
        {
          body: "Pay Per Click",
        },
        {
          body: "ABC System",
        },
        {
          body: "Volver ⬅",
        },
      ],
    },
    //La propiedad de NULL nos quita los [object Object] que se imprimen en pantalla
    null
  );
  
  const flowBotones = addKeyword(["1", "Continuar", "Volver ⬅"]).addAnswer(
    ["*Encuentra tu atención aquí 👇*"],
    {
      buttons: [
        {
          body: "Servicios",
        },
        {
          body: "Soporte Técnico",
        },
        {
          body: "Atención Comercial",
        },
        {
          body: "Productos",
        },
      ],
    },
    //La propiedad de NULL nos quita los [object Object] que se imprimen en pantalla
    null
  );
  
  // ** S A L U D O **
  
  const flowSaludo = addKeyword([
    "HOLA",
    "Hola",
    "OLA",
    "Ola",
    "hola",
    "ola",
    "BUNENAS",
    "Buenas",
    "buenas",
  ])
    .addAnswer([
      "Hola 😁 En *Agartha Marketing Agency* te damos la bienvenida.",
      "Te has comunicado con Agartha Marketing Agency.",
      "",
      "Este es nuestro nuevo sistema de Chat Bot de Autoatención ABC System.",
      "Es una prueba Beta de este sistema por lo que agradecemos tu colaboración y sugerencias.",
      "Esta supervisada en tiempo real por ejecutivos humanos",
      "",
      "Un gusto porder atenderte 🙌",
    ])
  
    // ** F O R M U L A R I O **
  
    .addAnswer(
      "¿Cuál es tu Nombre?",
      { capture: true },
      (ctx, { fallBack }) => {
        if (!ctx.body.includes("")) {
          return fallBack();
        }
        nombre = ctx.body
      }
      /*function validarLetras(cadena) {
        const regex = /^[a-zA-Z]+$/;
        return regex.test(cadena);
      }*/
    )
  
    .addAnswer(
      "¿Cuál es tu apellido paterno?",
      { capture: true },
      (ctx, { fallBack }) => {
        if (!ctx.body.includes("")) {
          return fallBack();
        }
        paterno = ctx.body
      }
    )
  
    .addAnswer(
      "¿Cuál es tu apellido materno?",
      { capture: true },
      (ctx, { fallBack }) => {
        if (!ctx.body.includes("")) {
          return fallBack();
        }
        materno = ctx.body
      }
    )
  
    .addAnswer(
      "Por último, nos gustaría saber tu *correo electrónico* para poder comunicarnos contigo 💪",
      { capture: true },
      (ctx, { fallBack }) => {
        // LA IDEA ES QUE ACEPTE @ Y ., SI NO CUMPLE CON ALGUNOS DE ESOS PARAMETROS,
        // INMEDIATAMENTE ARROJE ERROR
        /*if (!ctx.body !== '@' | '.') {*/
  
        if (!ctx.body.includes("@")) {
          return fallBack();
        }
        correo = ctx.body
        numero = ctx.from
      }
    )
  
    .addAnswer("Gracias por la Información, verificando datos de acceso 🕓",null,(ctx) => {
        nom = nombre
        pat = paterno
        mat = materno
        corr = correo
        num = numero
        datos.push({'Nombre:': nom,'Apellidos:': pat + '/' + mat, 'Correo': corr , 'Telefono': num})
        console.log('👉 Informacion del cliente: ', datos)        
    }
    )
    .addAnswer("Datos guardados con éxito !", { delay: 1400 })
  
    // ** M E N Ú  DE  O P C I O N E S **
  
    .addAnswer(
      "Escriba *1* para ingresar a la *Lista de Servicios*",
      { capture: true },
      (ctx, { fallBack }) => {
        if (!ctx.body.includes("")) {
          return fallBack();
        }
        console.log("Aquí viene todo: ", ctx.body);
      }
    )
    .addAnswer("", { capture: true }, (ctx, { fallBack }) => {
      if (!ctx.body.includes("")) {
        return fallBack();
      }
      console.log("Aquí viene todo: ", ctx.body);
    });
  const main = async () => {
    const adapterDB = new MySQLAdapter({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      database: MYSQL_DB_NAME,
      password: MYSQL_DB_PASSWORD,
      port: MYSQL_DB_PORT,
    });
    const adapterFlow = createFlow([
      flowEmailMarketing,
      flowSocialMediaMarketing,
      flowSearchEngineOptimization,
      flowLocalSEO,
      flowPayPerClick,
      flowABCSystem,
      flowSaludo,
      flowBotones,
      flowServicios,
      flowmensaje,
      flowproductos,
      flowatencioncomercial,
      flowgracias,
      flowtermino,
    ]);
    const adapterProvider = createProvider(BaileysProvider);
    createBot({
      flow: adapterFlow,
      provider: adapterProvider,
      database: adapterDB,
    });
    QRPortalWeb();
  };
  
  main();
  