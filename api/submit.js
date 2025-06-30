// // api/submit.js
const xmlrpc = require("xmlrpc");

const odooConfig = {
  url: "https://ov-openvisa1.odoo.com",
  db: "ov-openvisa1",
  username: "hossamelsawy745@gmail.com",  // غيره بالإيميل الفعلي
  password: "h20205000#H123"            // غيره بكلمة المرور
};

const common = xmlrpc.createClient({ url: `${odooConfig.url}/xmlrpc/2/common` });
const models = xmlrpc.createClient({ url: `${odooConfig.url}/xmlrpc/2/object` });

// المصادقة
common.methodCall("authenticate", [odooConfig.db, odooConfig.username, odooConfig.password, {}], function (err, uid) {
  if (err) return console.error("Auth Error:", err);

  // إنشاء Lead في CRM
  models.methodCall("execute_kw", [
    odooConfig.db,
    uid,
    odooConfig.password,
    "crm.lead",
    "create",
    [{
      name: "New Visa Request",
      contact_name: "اسم العميل",
      email_from: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      description: "رسالة إضافية من العميل"
    }]
  ], function (err2, result) {
    if (err2) return console.error("Create Error:", err2);
    console.log("Lead Created:", result);
  });
});



// import axios from 'axios';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const { name, email, phone, message } = req.body;

//   const odooUrl = "https://ov-openvisa1.odoo.com";
//   const db = "ov-openvisa1";
//   const username = "hossamelsawy745@gmail.com";
//   const password = "h20205000#H123";

//   try {
//     // Login
//     const loginRes = await axios.post(odooUrl, {
//       jsonrpc: "2.0",
//       method: "call",
//       id: 1,
//       params: {
//         service: "common",
//         method: "login",
//         args: [db, username, password],
//       },
//     });

//     const uid = loginRes.data.result;

//     // Create lead
//     const createRes = await axios.post(odooUrl, {
//       jsonrpc: "2.0",
//       method: "call",
//       id: 2,
//       params: {
//         service: "object",
//         method: "execute_kw",
//         args: [
//           db,
//           uid,
//           password,
//           "crm.lead",
//           "create",
//           [{
//             name: "طلب جديد من الفورم",
//             contact_name: name,
//             email_from: email,
//             phone: phone,
//             description: message,
//           }]
//         ]
//       }
//     });

//     res.status(200).json({ success: true, leadId: createRes.data.result });

//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// }
