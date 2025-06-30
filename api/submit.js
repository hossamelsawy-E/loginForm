// api/submit.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, phone, message } = req.body;

  const odooUrl = "https://ov-openvisa1.odoo.com";
  const db = "ov-openvisa1";
  const username = "hossamelsawy745@gmail.com";
  const password = "h20205000#H123";

  try {
    // Login
    const loginRes = await axios.post(odooUrl, {
      jsonrpc: "2.0",
      method: "call",
      id: 1,
      params: {
        service: "common",
        method: "login",
        args: [db, username, password],
      },
    });

    const uid = loginRes.data.result;

    // Create lead
    const createRes = await axios.post(odooUrl, {
      jsonrpc: "2.0",
      method: "call",
      id: 2,
      params: {
        service: "object",
        method: "execute_kw",
        args: [
          db,
          uid,
          password,
          "crm.lead",
          "create",
          [{
            name: "طلب جديد من الفورم",
            contact_name: name,
            email_from: email,
            phone: phone,
            description: message,
          }]
        ]
      }
    });

    res.status(200).json({ success: true, leadId: createRes.data.result });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
